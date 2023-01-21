import { Injectable } from '@nestjs/common';
import { DBService } from '../database.service';
import { CreateCompanyUserDto } from './dto/create-company-user.dto';
import {
  created,
  errorhandler,
  forbidden,
  successHandler,
} from '../util/response.handler';
import { UpdateCompanyUserDto } from './dto/update-company-user.dto';
import { InvoiceService } from '../invoice/invoice.service';
import { getEndTime, getStartTime } from '../util/dateFuntions';
import { ClinicPaymentDto } from './dto/clinic-payment.dto';
import { sendSms } from 'src/util/sms-service';
import { PAYMENT_SMS } from 'src/sms.template';
import { month } from 'src/util/month';
import { StatusMessage } from 'src/util/status-message';
import { SmsType } from 'src/util/sms-type';
import { SmsStatus } from '@prisma/client';

@Injectable()
export class CompanyUsersService {
  constructor(
    private readonly prisma: DBService,
    private readonly invoiceService: InvoiceService,
  ) {}

  async create(
    createCompanyUserDto: CreateCompanyUserDto,
    companyId: number,
    lastModifiedBy: number,
  ) {
    try {
      const result = await this.prisma.companyUser.create({
        data: {
          ...createCompanyUserDto,
          companyId,
          lastModifiedBy,
        },
      });
      return created(result);
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async payment(
    clinicPaymentDto: ClinicPaymentDto,
    companyId: number,
    lastModifiedBy: number,
  ) {
    try {
      const paymentInfo = await this.invoiceService.getPaymentInfoByClinicId(
        clinicPaymentDto.clinicId,
        companyId,
        clinicPaymentDto.month,
        clinicPaymentDto.year,
      );
      const paymentMonth = getStartTime(
        clinicPaymentDto.month,
        clinicPaymentDto.year,
      );
      const clinicInfo = await this.prisma.clinic.findUnique({
        where: {
          id: clinicPaymentDto.clinicId,
        },
        select: {
          mobile: true,
          name: true,
        },
      });
      // check this month payment is already paid or not
      const paymentExist = await this.prisma.referralBonusPayment.findFirst({
        where: {
          paymentMonth,
          companyId,
          clinicId: clinicPaymentDto.clinicId,
        },
      });
      if (paymentExist?.id) {
        return forbidden('Due amount of this month has already paid');
      }
      // check amount is equal to finalReferral amount
      if (clinicPaymentDto.amount !== paymentInfo.finalReferralAmount) {
        return forbidden(`Due amount is ${paymentInfo.finalReferralAmount}`);
      }
      const result = await this.prisma.referralBonusPayment.create({
        data: {
          clinicId: clinicPaymentDto.clinicId,
          invoiceAmount: paymentInfo.invoiceAmount,
          discountAmount: paymentInfo.discountAmount,
          totalReferralAmount: paymentInfo.totalReferralAmount,
          finalReferralAmount: paymentInfo.finalReferralAmount,
          paymentMonth,
          meansOfPayment: clinicPaymentDto.meansOfpayment,
          description: clinicPaymentDto.description,
          lastModifiedBy,
          companyId,
        },
      });
      const text = PAYMENT_SMS(
        clinicInfo.name,
        `${month[`${clinicPaymentDto.month}`]},${clinicPaymentDto.year}`,
      );
      const smsResult = await sendSms(clinicInfo.mobile, text);
      await this.prisma.smsLog.create({
        data: {
          receiverPhone: clinicInfo.mobile,
          message: text,
          clinicId: clinicPaymentDto.clinicId,
          companyId,
          status: smsResult === true ? SmsStatus.Sent : SmsStatus.Failed,
          statusMessage:
            smsResult === true ? StatusMessage.success : StatusMessage.stack,
          type: SmsType.payment,
        },
      });
      return created(result);
    } catch (error) {
      console.log(error.message);
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async findAll(
    companyId: number,
    pageNumber: number,
    limit: number,
    search: string,
  ) {
    try {
      const totalCount = await this.getTotalCompanyUserCount(companyId, search);
      const needToSkip = (pageNumber - 1) * limit;
      const result = await this.prisma.companyUser.findMany({
        skip: needToSkip || 0,
        take: limit || 10,
        where: {
          companyId,
          isDeleted: false,
          user: {
            OR: [
              {
                fullName: {
                  contains: search,
                },
              },
              {
                userName: {
                  contains: search,
                },
              },
              {
                email: {
                  contains: search,
                },
              },
            ],
          },
        },
        select: {
          id: true,
          companyId: true,
          user: {
            select: {
              id: true,
              fullName: true,
              userName: true,
              email: true,
              role: true,
              phone: true,
            },
          },
          createdDate: true,
          lastModifiedBy: true,
          lastModifiedDate: true,
          isDeleted: true,
        },
        orderBy: {
          createdDate: 'desc',
        },
      });
      return successHandler(
        { pageNumber, limit, totalCount, data: result },
        'Success',
      );
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async getTotalCompanyUserCount(companyId: number, search: string) {
    return await this.prisma.companyUser.count({
      where: {
        companyId,
        isDeleted: false,
        user: {
          OR: [
            {
              fullName: {
                contains: search,
              },
            },
            {
              userName: {
                contains: search,
              },
            },
            {
              email: {
                contains: search,
              },
            },
          ],
        },
      },
    });
  }

  async clinicDetails(companyId: number, clinicId: number, month: number) {
    try {
      const paymentHistory = await this.prisma.referralBonusPayment.findMany({
        where: {
          companyId,
          clinicId,
        },
        orderBy: {
          paymentMonth: 'desc',
        },
        take: month,
      });
      const paymentMonth = paymentHistory[0]?.paymentMonth
        ? paymentHistory[0].paymentMonth
        : new Date(`1970-01-05 12:06:19.946`);
      console.log('History', paymentHistory);
      const dueAmount = await this.getDueAmountSinceLastPayment(
        clinicId,
        companyId,
        paymentMonth,
      );
      const currentDue = dueAmount.comission - dueAmount.discount;
      return successHandler({ paymentHistory, currentDue }, 'Success');
    } catch (error) {
      console.log(error.message);
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.prisma.companyUser.findUnique({
        where: {
          id: id,
        },
      });
      return successHandler(result, 'Success');
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async clinicPayment(
    companyId: number,
    clinicId: number,
    month: number,
    year: number,
  ) {
    try {
      const paymentInfo = await this.prisma.referralBonusPayment.findFirst({
        where: {
          companyId,
          clinicId,
          paymentMonth: {
            gt: getEndTime(month - 1, year),
            lte: getEndTime(month, year),
          },
        },
      });
      if (paymentInfo?.id) {
        return successHandler({ dueAmount: 0 }, 'Success');
      }
      const result = await this.invoiceService.getPaymentInfoByClinicId(
        clinicId,
        companyId,
        month,
        year,
      );
      return successHandler(
        { dueAmount: result.finalReferralAmount },
        'Success',
      );
    } catch (error) {
      console.log(error.message);
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async getReferralAppointments(companyId: number) {
    try {
      const appointments =
        await this.invoiceService.getReferralAppointmentsCount(companyId);
      return successHandler(
        { totalReferralAppointments: appointments },
        'Success',
      );
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async getInpersonAppointments(companyId: number) {
    try {
      const appointments =
        await this.invoiceService.getInpersonAppointmentsCount(companyId);
      return successHandler(
        { totalInpersonAppointments: appointments },
        'Success',
      );
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async getAppointmentReview(companyId: number) {
    try {
      const review = await this.invoiceService.appointmentreview(companyId);
      return successHandler(review, 'Success');
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async getPatientReport(companyId: number) {
    try {
      const patientReport = await this.invoiceService.patientReport(companyId);
      return successHandler(patientReport, 'Success');
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async getIncomeReport(companyId: number) {
    try {
      const incomeReport = await this.invoiceService.incomeReport(companyId);
      return successHandler(incomeReport, 'Success');
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async getPatientSurvey(companyId: number) {
    try {
      const patientSurvey = await this.invoiceService.patientSurveyByCompanyId(
        companyId,
      );
      return successHandler(patientSurvey, 'Success');
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
      return await this.invoiceService.getTodaysReport(
        companyId,
        pageNumber,
        limit,
        search,
      );
    } catch (err) {
      return errorhandler(400, JSON.stringify(err.message));
    }
  }

  async getAccountsReport(companyId: number) {
    try {
      return await this.invoiceService.getCompanyAccountsReport(companyId);
    } catch (err) {
      return errorhandler(400, JSON.stringify(err.message));
    }
  }

  async getDueAmountSinceLastPayment(
    clinicId: number,
    companyId: number,
    lastDate: Date,
  ) {
    const invoices = await this.prisma.invoice.findMany({
      where: {
        clinicId: clinicId,
        companyId,
        createdDate: {
          gt: getEndTime(lastDate.getMonth(), lastDate.getFullYear()),
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
    let discount = 0;
    let cost = 0;
    let comission = 0;
    for (const inv of invoices) {
      discount += Number(inv.discount);
      for (const i of inv.invoiceInvestigation) {
        if (i.investigation.companyId === companyId) {
          cost += Number(i.investigation.cost);
          comission += Math.floor(
            (Number(i.investigation.comission) * Number(i.investigation.cost)) /
              100,
          );
        }
      }
    }
    return {
      discount,
      cost,
      comission,
    };
  }

  async update(
    id: number,
    updateCompanyUserDto: UpdateCompanyUserDto,
    companyId: number,
    lastModifiedBy: number,
  ) {
    try {
      const user = await this.prisma.companyUser.findFirst({
        where: {
          id,
          companyId,
        },
        select: {
          userId: true,
        },
      });
      const result = await this.prisma.user.update({
        where: {
          id: user.userId,
        },
        data: {
          ...updateCompanyUserDto,
          lastModifiedBy,
          lastModifiedDate: new Date(),
        },
        select: {
          id: true,
          fullName: true,
          userName: true,
          email: true,
          role: true,
          phone: true,
          lastModifiedBy: true,
          lastModifiedDate: true,
          isDeleted: true,
        },
      });
      return successHandler(result, 'Success');
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async remove(id: number, lastModifiedBy: number) {
    try {
      const result = await this.prisma.companyUser.update({
        where: { id },
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
}
