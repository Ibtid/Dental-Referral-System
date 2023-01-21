import { Injectable } from '@nestjs/common';
import { DBService } from '../database.service';
import { SmsLogService } from '../sms-log/sms-log.service';
import { REFERRAL_SMS } from '../sms.template';
import {
  created,
  errorhandler,
  forbidden,
  successHandler,
} from '../util/response.handler';
import { SmsType } from '../util/sms-type';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { invoiceId } from '../util/create-id';
import { convertFileToBase64, exportPDF } from '../util/export-file';
import { Invoice, Prisma } from '@prisma/client';
import * as fs from 'node:fs';
import {
  getEndTime,
  getMonthsNameAndYearFromDate,
  getPreviousDay,
  getStartTime,
  subtractMonths,
} from '../util/dateFuntions';
import * as path from 'node:path';
import { getMimeType } from '../util/mimeList';
import { qrCodeGenerator } from 'src/util/qrCodeGenerator';

@Injectable()
export class InvoiceService {
  constructor(
    private readonly prisma: DBService,
    private readonly smsLogService: SmsLogService,
  ) {}
  async create(
    createInvoiceDto: CreateInvoiceDto,
    lastModifiedBy: number,
    companyId: number,
  ) {
    try {
      if (createInvoiceDto.discount > 100) {
        return forbidden('Discount can not be greater than 100%');
      }
      const result = await this.prisma.$transaction(async (prisma) => {
        const grossTotal = await this.getGrossTotal(
          createInvoiceDto.investigation,
          companyId,
        );
        const discount = Math.floor(
          (createInvoiceDto.discount * Number(grossTotal)) / 100,
        );
        const total = Number(grossTotal) - discount; //Decimal number
        const firstInvoice = await prisma.invoice.findFirst({
          where: {
            companyId,
            patientId: createInvoiceDto.patientId,
          },
        });
        const latestInvoice = await prisma.invoice.findMany({
          orderBy: {
            createdDate: 'desc',
          },
          take: 1,
        });
        const recentId = this.getRecentId(latestInvoice);
        const invoiceResult = await this.createInvoice(
          prisma,
          recentId,
          createInvoiceDto,
          companyId,
          Number(grossTotal),
          discount,
          total,
          firstInvoice?.createdDate,
          lastModifiedBy,
        );
        const investigationsName = await this.createInvoiceInvestigation(
          prisma,
          createInvoiceDto,
          invoiceResult.reportId,
          lastModifiedBy,
        );

        if (createInvoiceDto.clinicId) {
          const clinic = await prisma.partnership.findFirst({
            where: {
              clinicId: createInvoiceDto.clinicId,
              companyId,
            },
            select: {
              clinic: {
                select: {
                  id: true,
                  name: true,
                  mobile: true,
                },
              },
            },
          });

          const patient = await prisma.patient.findUnique({
            where: {
              id: createInvoiceDto.patientId,
            },
          });

          const sms = REFERRAL_SMS(
            clinic.clinic.name,
            patient.name,
            investigationsName,
          );
          await this.smsLogService.create(
            prisma,
            clinic?.clinic.mobile,
            sms,
            clinic?.clinic.id,
            companyId,
            SmsType.referral,
          );
        }
        const invoiceToPrint = await this.getInvoiceToPrint(
          prisma,
          invoiceResult.id,
        );
        return { invoiceToPrint, invoiceResult };
      });
      const relativePath = `./files/exports/Tests-${Math.floor(
        Math.random() * (999 + 1),
      )}-${result.invoiceToPrint.reportId}.pdf`;
      const html = fs.readFileSync(
        './src/templates/pdf/invoice-create.html',
        'utf8',
      );
      const document = {
        html: html,
        data: result.invoiceToPrint,
        path: relativePath,
        type: '',
      };
      const base64 = await exportPDF(document);
      return created({ invoice: result.invoiceResult, print: base64 });
    } catch (error) {
      console.log(error);
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async printInvoice(id: number) {
    const result = await this.prisma.$transaction(async (prisma) => {
      const invoiceToPrint = await this.getInvoiceToPrint(prisma, id);
      const relativePath = `./files/exports/Tests-${Math.floor(
        Math.random() * (999 + 1),
      )}-${invoiceToPrint.reportId}.pdf`;
      const html = fs.readFileSync(
        './src/templates/pdf/invoice-create.html',
        'utf8',
      );
      const document = {
        html: html,
        data: invoiceToPrint,
        path: relativePath,
        type: '',
      };
      const base64 = await exportPDF(document);
      return { base64: base64, mimeType: getMimeType('pdf') };
    });
    return successHandler(
      { base64: result.base64, mimeType: result.mimeType },
      'Success',
    );
  }

  async findAll(
    pageNumber: number,
    limit: number,
    search: string,
    companyId: number,
  ) {
    try {
      const totalCount = await this.getTotalCount(companyId, search);
      const needToSkip = (pageNumber - 1) * limit;
      const result = await this.prisma.invoice.findMany({
        where: {
          companyId,
          isDeleted: false,
          OR: [
            {
              reportId: {
                contains: search,
              },
            },
            {
              patient: {
                name: {
                  contains: search,
                },
              },
            },
            {
              patient: {
                address: {
                  contains: search,
                },
              },
            },
            {
              mobileNumber: {
                contains: search,
              },
            },
          ],
        },
        orderBy: {
          createdDate: 'desc',
        },
        select: {
          id: true,
          reportId: true,
          patient: {
            select: {
              id: true,
              name: true,
              age: true,
              address: true,
            },
          },
          clinic: {
            select: {
              id: true,
              name: true,
            },
          },
          companyId: true,
          mobileNumber: true,
          deliveryTime: true,
          createdDate: true,
          invoiceInvestigation: {
            where: {
              reportUploaded: true,
            },
            select: {
              id: true,
            },
          },
        },
        skip: needToSkip || 0,
        take: limit || 10,
      });
      return successHandler(
        { pageNumber, limit, totalCount, data: result },
        'Success',
      );
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async getTotalCount(companyId: number, search: string) {
    return await this.prisma.invoice.count({
      where: {
        companyId,
        isDeleted: false,
        OR: [
          {
            reportId: {
              contains: search,
            },
          },
          {
            patient: {
              name: {
                contains: search,
              },
            },
          },
          {
            patient: {
              address: {
                contains: search,
              },
            },
          },
          {
            mobileNumber: {
              contains: search,
            },
          },
        ],
      },
    });
  }

  async getFinancesByCompanyId(
    pageNumber: number,
    limit: number,
    search: string,
    companyId: number,
  ) {
    try {
      const totalCount = await this.prisma.invoice.count({
        where: {
          companyId,
          isDeleted: false,
        },
      });
      const needToSkip = (pageNumber - 1) * limit;
      const result = await this.prisma.invoice.findMany({
        where: {
          companyId,
          isDeleted: false,
          OR: [
            {
              reportId: {
                contains: search,
              },
            },
            {
              patient: {
                name: {
                  contains: search,
                },
              },
            },
            {
              clinic: {
                name: {
                  contains: search,
                },
              },
            },
          ],
        },

        orderBy: {
          createdDate: 'desc',
        },

        select: {
          id: true,
          reportId: true,
          patient: {
            select: {
              id: true,
              name: true,
              gender: true,
              address: true,
            },
          },
          clinic: {
            select: {
              id: true,
              name: true,
            },
          },
          companyId: true,
          discount: true,
          mobileNumber: true,
          deliveryTime: true,
          grossTotal: true,
          total: true,
          paid: true,
          due: true,
          paymentMethod: true,
          paymentDescription: true,
          createdDate: true,
        },
        skip: needToSkip || 0,
        take: limit || 10,
      });
      return successHandler(
        { pageNumber, limit, totalCount, data: result },
        'Success',
      );
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  // total referred appointments
  async getReferralAppointmentsCount(companyId: number) {
    try {
      const totalReferredAppointment = await this.prisma.invoice.count({
        where: {
          companyId,
        },
        select: {
          clinicId: true,
        },
      });
      return totalReferredAppointment.clinicId;
    } catch (error) {
      console.log(error);
    }
  }

  async getInpersonAppointmentsCount(companyId: number) {
    try {
      const totalInpersonAppointment = await this.prisma.invoice.count({
        where: {
          companyId,
          clinicId: null,
        },
      });
      return totalInpersonAppointment;
    } catch (error) {
      console.log(error);
    }
  }

  // appointment review
  async appointmentreview(companyId: number) {
    try {
      let total = 0;
      let finalResult = {};
      const invoiceInvestigationsArray = await this.prisma.invoice.findMany({
        where: {
          companyId,
        },
        select: {
          invoiceInvestigation: {
            select: {
              investigation: {
                select: {
                  name: true,
                  isDeleted: true,
                },
              },
            },
          },
        },
      });
      for (let inv of invoiceInvestigationsArray) {
        for (let i of inv.invoiceInvestigation) {
          if (!i.investigation.isDeleted) {
            total++;
            finalResult[i.investigation.name]
              ? finalResult[i.investigation.name]++
              : (finalResult[i.investigation.name] = 1);
          }
        }
      }
      return {
        total,
        data: finalResult,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async patientReport(companyId: number) {
    try {
      const dailyReport = await this.dailyReport(companyId);
      const weeklyReport = await this.weeklyReport(companyId);
      const monthlyReport = await this.monthlyReport(companyId);
      return {
        dailyReport,
        weeklyReport,
        monthlyReport,
      };
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async incomeReport(companyId: number) {
    try {
      const dailyIncome = await this.dailyIncome(companyId);
      const weeklyIncome = await this.weeklyIncome(companyId);
      const monthlyIncome = await this.monthlyIncome(companyId);
      return {
        dailyIncome,
        weeklyIncome,
        monthlyIncome,
      };
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async findByClinic(
    clinicId: number,
    pageNumber: number,
    limit: number,
    search: string,
  ) {
    try {
      const totalCount = await this.prisma.invoice.count({
        where: {
          clinicId,
          isDeleted: false,
        },
      });
      const needToSkip = (pageNumber - 1) * limit;
      const result = await this.prisma.invoice.findMany({
        skip: needToSkip || 0,
        take: limit || 10,
        where: {
          clinicId,
          patient: {
            OR: [
              {
                name: {
                  contains: search,
                },
              },
              {
                contactNumber: {
                  contains: search,
                },
              },
            ],
          },
        },
        orderBy: {
          createdDate: 'desc',
        },

        select: {
          patient: {
            select: {
              name: true,
              contactNumber: true,
            },
          },
          invoiceInvestigation: {
            select: {
              investigation: {
                select: {
                  name: true,
                },
              },
            },
          },
          createdDate: true,
        },
      });
      return { pageNumber, limit, totalCount, data: result };
    } catch (error) {
      console.log(error.message);
    }
  }

  async getCompanyAccountsReport(companyId: number) {
    try {
      let totalInvoiceAmount = 0;
      let totalDiscountAmount = 0;
      let netAmount = 0;
      const invoiceCount = await this.prisma.invoice.count({
        where: {
          companyId,
        },
      });
      if (invoiceCount === 0) {
        return successHandler(
          { totalInvoiceAmount, totalDiscountAmount, netAmount },
          'Success',
        );
      }
      const invoices = await this.prisma.invoice.groupBy({
        by: ['companyId'],
        _sum: {
          grossTotal: true,
          discount: true,
        },
        where: { companyId },
      });
      netAmount =
        Number(invoices[0]._sum.grossTotal) - Number(invoices[0]._sum.discount);
      return successHandler(
        {
          totalInvoiceAmount: Number(invoices[0]._sum.grossTotal),
          totalDiscountAmount: Number(invoices[0]._sum.discount),
          netAmount,
        },
        'Success',
      );
    } catch (err) {
      console.log(err);
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.prisma.invoice.findUnique({
        where: {
          id: id,
        },

        select: {
          id: true,
          reportId: true,
          deliveryTime: true,
          grossTotal: true,
          total: true,
          discount: true,
          paid: true,
          due: true,
          mobileNumber: true,
          paymentMethod: true,
          patient: {
            select: {
              id: true,
              name: true,
              address: true,
              email: true,
              age: true,
              gender: true,
            },
          },
          clinic: {
            select: {
              name: true,
            },
          },
          invoiceInvestigation: {
            select: {
              id: true,
              reportUploaded: true,
              investigation: {
                select: {
                  name: true,
                  cost: true,
                },
              },
            },
            orderBy: {
              createdDate: 'asc',
            },
          },
        },
      });
      return successHandler(result, 'Success');
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async getPaymentInfoByClinicId(
    clinicId: number,
    companyId: number,
    month: number,
    year: number,
  ) {
    try {
      const startTime = getStartTime(month, year);
      const endTime = getEndTime(month, year);
      const invoices = await this.prisma.invoice.findMany({
        where: {
          clinicId,
          createdDate: {
            gte: startTime,
            lte: endTime,
          },
        },
        select: {
          discount: true,
          invoiceInvestigation: {
            select: {
              investigation: {
                select: {
                  cost: true,
                  comission: true,
                  companyId: true,
                },
              },
            },
          },
        },
      });
      // console.log('invoices', invoices);
      let discount = 0;
      let cost = 0;
      let comission = 0;
      for (const inv of invoices) {
        discount += Number(inv.discount);
        for (const i of inv.invoiceInvestigation) {
          if (i.investigation.companyId === companyId) {
            cost += Number(i.investigation.cost);
            comission += Math.floor(
              (Number(i.investigation.comission) *
                Number(i.investigation.cost)) /
                100,
            );
          }
        }
      }
      return {
        invoiceAmount: cost,
        discountAmount: discount,
        totalReferralAmount: comission,
        finalReferralAmount:
          comission - discount > 0 ? comission - discount : 0,
      };
    } catch (error) {
      console.log(error.message);
    }
  }

  async update(
    id: number,
    updateInvoiceDto: UpdateInvoiceDto,
    lastModifiedBy: number,
  ) {
    try {
      const report: Invoice = await this.prisma.invoice.findUnique({
        where: {
          id,
        },
      });
      if (Number(report.due) < updateInvoiceDto.amount) {
        return forbidden(`Due amount is ${report.due}`);
      }
      const result = await this.prisma.invoice.update({
        where: {
          id,
        },
        data: {
          paid: Number(report.paid) + updateInvoiceDto.amount,
          due: Number(report.due) - updateInvoiceDto.amount,
          lastModifiedBy,
          lastModifiedDate: new Date(),
        },
      });
      return successHandler(result, 'Success');
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async uploadInvoiceInvestigationReport(
    id: number,
    filename: string,
    lastModifiedBy: number,
  ) {
    try {
      const invoiceInvestigationToUpdate =
        await this.prisma.invoiceInvestigation.findUnique({
          where: {
            id,
          },
        });
      if (invoiceInvestigationToUpdate.reportPath) {
        fs.unlink(invoiceInvestigationToUpdate.reportPath, function (err) {
          if (err) throw err;
          // if no error, file has been deleted successfully
          console.log('File deleted!');
        });
      }
      const result = await this.prisma.invoiceInvestigation.update({
        where: {
          id,
        },
        data: {
          reportPath: `files/exports/${filename}`,
          reportUploaded: true,
          lastModifiedBy,
          lastModifiedDate: new Date(),
        },
      });
      return successHandler(result, 'Success');
    } catch (error) {
      console.log(error, 'ji');
      if (filename) {
        fs.unlink(
          path.join(path.resolve('./files/exports'), filename),
          (error_) => {
            if (error_) {
              console.log(error_);
              throw error_;
            }
          },
        );
      }
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async downloadFile(id: number) {
    try {
      const { reportPath } = await this.prisma.invoiceInvestigation.findUnique({
        where: {
          id,
        },
        select: {
          reportPath: true,
        },
      });
      if (reportPath === null || reportPath === '') {
        return errorhandler(404, 'Report not found');
      }
      const { base64, ext } = convertFileToBase64(reportPath);
      const mimeType = getMimeType(ext);
      return successHandler({ base64, mimeType }, 'Success');
    } catch (error) {
      console.log(error.message);
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async remove(id: number, lastModifiedBy: number) {
    try {
      const result = await this.prisma.invoice.update({
        where: {
          id: id,
        },
        data: {
          isDeleted: true,
          lastModifiedBy,
          lastModifiedDate: new Date(),
        },
      });
      return successHandler(result, 'Success');
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  getRecentId(latestInvoice: any) {
    let recentId = '';
    if (latestInvoice.length === 0) {
      const todaysDate = new Date();
      let month = '' + (todaysDate.getMonth() + 1);
      let day = '' + todaysDate.getDate();
      const year = todaysDate.getFullYear().toString().slice(2);

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      const todaysDateSegment = year + month + +day;
      recentId = 'INV' + todaysDateSegment + '00000';
    } else {
      recentId = latestInvoice[0].reportId;
    }
    return recentId;
  }

  async getGrossTotal(investigation: any, companyId: number) {
    const grossTotal = await this.prisma.investigation.aggregate({
      where: {
        companyId,
        id: {
          in: investigation,
        },
      },
      _sum: {
        cost: true,
      },
    });
    return grossTotal._sum.cost;
  }

  async getPatientViewData(invoiceNumber: string, mobileNumber: string) {
    try {
      const invoice = await this.prisma.invoice.findFirst({
        where: {
          reportId: invoiceNumber,
          mobileNumber,
        },
        select: {
          patient: {
            select: {
              name: true,
            },
          },
          mobileNumber: true,
          reportId: true,
          invoiceInvestigation: {
            select: {
              investigation: {
                select: {
                  name: true,
                },
              },
              id: true,
              reportUploaded: true,
            },
          },
        },
      });
      return successHandler(invoice, 'Success');
    } catch (error) {
      console.log(error);
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async patientSurveyByCompanyId(companyId: number) {
    try {
      const lastSixMonthsInvoices = await this.prisma.invoice.findMany({
        where: {
          companyId,
          createdDate: {
            gte: subtractMonths(new Date(), 6),
          },
        },
      });
      const patientSurvey = this.getPatientSurvey(lastSixMonthsInvoices);
      return patientSurvey;
    } catch (err) {
      return errorhandler(400, JSON.stringify(err.message));
    }
  }

  async getTodaysReport(
    companyId: number,
    pageNumber: number,
    limit: number,
    search: string,
  ) {
    try {
      const totalCount = await this.getTotalTodaysReportCount(
        companyId,
        search,
      );
      const needToSkip = (pageNumber - 1) * limit;
      const todaysInvoices = await this.prisma.invoice.findMany({
        where: {
          companyId,
          createdDate: {
            gt: getPreviousDay(),
          },
          OR: [
            {
              patient: {
                name: {
                  contains: search,
                },
              },
            },
            {
              patient: {
                address: {
                  contains: search,
                },
              },
            },
            {
              mobileNumber: {
                contains: search,
              },
            },
            {
              clinic: {
                name: {
                  contains: search,
                },
              },
            },
            {
              clinic: {
                email: {
                  contains: search,
                },
              },
            },
            {
              clinic: {
                mobile: {
                  contains: search,
                },
              },
            },
          ],
        },
        select: {
          patient: {
            select: {
              name: true,
              gender: true,
              address: true,
              contactNumber: true,
            },
          },
          createdDate: true,
          clinic: {
            select: {
              name: true,
              email: true,
              mobile: true,
            },
          },
          grossTotal: true,
          discount: true,
          total: true,
          mobileNumber: true,
          paid: true,
          due: true,
          paymentMethod: true,
          paymentDescription: true,
          deliveryTime: true,
          invoiceInvestigation: {
            select: {
              investigation: {
                select: {
                  name: true,
                },
              },
              amount: true,
            },
          },
        },
        skip: needToSkip || 0,
        take: limit || 10,
      });
      return successHandler(
        { pageNumber, limit, totalCount, data: todaysInvoices },
        'Success',
      );
    } catch (err) {
      return errorhandler(400, JSON.stringify(err.message));
    }
  }

  async getTotalTodaysReportCount(companyId: number, search: string) {
    return await this.prisma.invoice.count({
      where: {
        companyId,
        createdDate: {
          gt: getPreviousDay(),
        },
        OR: [
          {
            patient: {
              name: {
                contains: search,
              },
            },
          },
          {
            patient: {
              address: {
                contains: search,
              },
            },
          },
          {
            mobileNumber: {
              contains: search,
            },
          },
          {
            clinic: {
              name: {
                contains: search,
              },
            },
          },
          {
            clinic: {
              email: {
                contains: search,
              },
            },
          },
          {
            clinic: {
              mobile: {
                contains: search,
              },
            },
          },
        ],
      },
    });
  }

  async getInvoiceToPrint(prisma: Prisma.TransactionClient, id: number) {
    const invoiceToPrint = await prisma.invoice.findFirst({
      where: { id: id },
      select: {
        company: {
          select: {
            logoPath: true,
            name: true,
            address: true,
            email: true,
            contactNumber: true,
            website: true,
          },
        },
        reportId: true,
        patient: {
          select: {
            name: true,
            address: true,
            contactNumber: true,
            email: true,
            gender: true,
            age: true,
          },
        },
        clinic: {
          select: {
            name: true,
            email: true,
          },
        },
        grossTotal: true,
        discount: true,
        total: true,
        mobileNumber: true,
        createdDate: true,
        paid: true,
        due: true,
        paymentMethod: true,
        paymentDescription: true,
        deliveryTime: true,
        invoiceInvestigation: {
          select: {
            investigation: {
              select: {
                name: true,
                referenceValue: true,
              },
            },
            amount: true,
          },
        },
      },
    });

    const qrData = {
      patient: invoiceToPrint?.patient.name,
      reportId: invoiceToPrint?.reportId,
    };
    const qrCode = await qrCodeGenerator(qrData);
    invoiceToPrint['qrCode'] = qrCode;

    invoiceToPrint['deliveryDate'] = new Date(
      invoiceToPrint.deliveryTime,
    ).toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    return invoiceToPrint;
  }
  async createInvoice(
    prisma: Prisma.TransactionClient,
    recentId: string,
    createInvoiceDto: CreateInvoiceDto,
    companyId: number,
    grossTotal: number,
    discount: number,
    total: number,
    firstVisit: Date,
    lastModifiedBy: number,
  ) {
    return await prisma.invoice.create({
      data: {
        reportId: invoiceId(recentId),
        patientId: createInvoiceDto.patientId,
        clinicId: createInvoiceDto.clinicId ? createInvoiceDto.clinicId : null,
        companyId,
        grossTotal,
        discount,
        total,
        mobileNumber: createInvoiceDto.mobileNumber,
        paid: createInvoiceDto.paid,
        due: total - createInvoiceDto.paid,
        paymentMethod: createInvoiceDto.paymentMethod,
        paymentDescription: createInvoiceDto.paymentDescription,
        deliveryTime: createInvoiceDto.deliveryTime,
        firstVisit,
        lastModifiedBy,
      },
    });
  }

  async createInvoiceInvestigation(
    prisma: Prisma.TransactionClient,
    createInvoiceDto: CreateInvoiceDto,
    reportId: string,
    lastModifiedBy: number,
  ) {
    const investigations = await prisma.investigation.findMany({
      where: {
        id: {
          in: createInvoiceDto.investigation,
        },
        isDeleted: false,
      },
    });
    let investigationsName = '';
    for (let index = 0; index < investigations.length; index++) {
      investigationsName +=
        investigations[`${index}`].name +
        `${index < investigations.length - 1 ? ', ' : ''}`;
      await prisma.invoiceInvestigation.create({
        data: {
          invoiceId: reportId,
          investigationId: investigations[`${index}`].id,
          amount: investigations[`${index}`].cost,
          lastModifiedBy,
        },
      });
    }

    return investigationsName;
  }

  async dailyReport(companyId: number) {
    let lastDay: any = Date.now() - 24 * 60 * 60 * 1000;
    lastDay = new Date(lastDay).toISOString();
    const dailyReport = await this.prisma.invoice.findMany({
      where: {
        AND: [
          {
            companyId,
          },
          {
            createdDate: {
              gte: lastDay,
            },
          },
        ],
      },
    });
    return dailyReport.length;
  }

  async dailyIncome(companyId: number) {
    let lastDay: any = Date.now() - 24 * 60 * 60 * 1000;
    lastDay = new Date(lastDay).toISOString();
    const dailyReport = await this.prisma.invoice.aggregate({
      where: {
        AND: [
          {
            companyId,
          },
          {
            createdDate: {
              gte: lastDay,
            },
          },
        ],
      },
      _sum: {
        total: true,
      },
    });
    return dailyReport._sum.total || 0;
  }

  async weeklyReport(companyId: number) {
    let lastWeek: any = Date.now() - 7 * 24 * 60 * 60 * 1000;
    lastWeek = new Date(lastWeek).toISOString();
    const weeklyReport = await this.prisma.invoice.findMany({
      where: {
        AND: [
          {
            companyId,
          },
          {
            createdDate: {
              gte: lastWeek,
            },
          },
        ],
      },
    });
    return weeklyReport.length;
  }

  async weeklyIncome(companyId: number) {
    let lastWeek: any = Date.now() - 7 * 24 * 60 * 60 * 1000;
    lastWeek = new Date(lastWeek).toISOString();
    const weeklyReport = await this.prisma.invoice.aggregate({
      where: {
        AND: [
          {
            companyId,
          },
          {
            createdDate: {
              gte: lastWeek,
            },
          },
        ],
      },
      _sum: {
        total: true,
      },
    });
    return weeklyReport._sum.total || 0;
  }

  async monthlyReport(companyId: number) {
    let lastMonth: any = Date.now() - 30 * 24 * 60 * 60 * 1000;
    lastMonth = new Date(lastMonth).toISOString();
    const monthlyReport = await this.prisma.invoice.findMany({
      where: {
        AND: [
          {
            companyId,
          },
          {
            createdDate: {
              gte: lastMonth,
            },
          },
        ],
      },
    });
    return monthlyReport.length;
  }

  async monthlyIncome(companyId: number) {
    let lastMonth: any = Date.now() - 30 * 24 * 60 * 60 * 1000;
    lastMonth = new Date(lastMonth).toISOString();
    const monthlyReport = await this.prisma.invoice.aggregate({
      where: {
        AND: [
          {
            companyId,
          },
          {
            createdDate: {
              gte: lastMonth,
            },
          },
        ],
      },
      _sum: {
        total: true,
      },
    });
    return monthlyReport._sum.total || 0;
  }

  getPatientSurvey = (lastSixMonthsInvoices: Invoice[]) => {
    let lastSixMonthsPatientSurvey = [];
    let oldPatientList = [];
    let newPatientList = [];
    for (let index = 0; index < 6; index++) {
      lastSixMonthsPatientSurvey.unshift({
        month: getMonthsNameAndYearFromDate(new Date(), index),
        oldPatient: 0,
        newPatient: 0,
      });
      oldPatientList.unshift({
        month: getMonthsNameAndYearFromDate(new Date(), index),
        list: [],
      });
      newPatientList.unshift({
        month: getMonthsNameAndYearFromDate(new Date(), index),
        list: [],
      });
    }

    lastSixMonthsInvoices.forEach((invoice: Invoice) => {
      const dateSearchIndex = lastSixMonthsPatientSurvey.findIndex(
        (object: any) => {
          return (
            object.month ===
            getMonthsNameAndYearFromDate(invoice.createdDate, 0)
          );
        },
      );

      if (
        //if the patient visits multiple times in current month, but never visited in previous months and not added in the new patient list -> NEW patient
        (invoice.firstVisit &&
          getMonthsNameAndYearFromDate(invoice.firstVisit, 0) ===
            lastSixMonthsPatientSurvey[`${dateSearchIndex}`].month &&
          newPatientList[`${dateSearchIndex}`].list.indexOf(
            invoice.patientId,
          ) === -1) ||
        //if the patient has never visited in previously and not added in the new patient list -> nEW pATIENT
        (!invoice.firstVisit &&
          newPatientList[`${dateSearchIndex}`].list.indexOf(
            invoice.patientId,
          ) === -1)
      ) {
        if (
          oldPatientList[`${dateSearchIndex}`].list.indexOf(
            invoice.patientId,
          ) !== -1
        ) {
          oldPatientList[`${dateSearchIndex}`].list.splice(
            oldPatientList[`${dateSearchIndex}`].list.indexOf(
              invoice.patientId,
            ),
            1,
          );
        }
        newPatientList[`${dateSearchIndex}`].list.push(invoice.patientId);
        lastSixMonthsPatientSurvey[`${dateSearchIndex}`].newPatient =
          newPatientList[`${dateSearchIndex}`].list.length;
      }
      //if the patient visits in previous months and not added in the old patient list
      else if (
        invoice.firstVisit &&
        oldPatientList[`${dateSearchIndex}`].list.indexOf(invoice.patientId) ===
          -1 &&
        getMonthsNameAndYearFromDate(invoice.firstVisit, 0) !==
          lastSixMonthsPatientSurvey[`${dateSearchIndex}`].month &&
        newPatientList[`${dateSearchIndex}`].list.indexOf(invoice.patientId) ===
          -1
      ) {
        oldPatientList[`${dateSearchIndex}`].list.push(invoice.patientId);
        lastSixMonthsPatientSurvey[`${dateSearchIndex}`].oldPatient =
          oldPatientList[`${dateSearchIndex}`].list.length;
      }
    });

    return lastSixMonthsPatientSurvey;
  };
}
