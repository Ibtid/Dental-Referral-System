import { Injectable } from '@nestjs/common';
import { report } from 'process';
import { InvoiceService } from 'src/invoice/invoice.service';
import { convertFileToBase64 } from 'src/util/export-file';
import { DBService } from '../database.service';
import {
  created,
  errorhandler,
  successHandler,
} from '../util/response.handler';
import { CreatePatientDto } from './dto/create-patient.dto';
import { PatientLoginDto } from './dto/patient-login.dto';

@Injectable()
export class PatientService {
  constructor(
    private readonly prisma: DBService,
    private readonly invoiceService: InvoiceService,
  ) {}
  async create(
    createPatientDto: CreatePatientDto,
    companyId: number,
    lastModifiedBy: number,
  ) {
    try {
      const result = await this.prisma.patient.create({
        data: {
          ...createPatientDto,
          companyId,
          lastModifiedBy,
        },
      });
      return created(result);
    } catch (error) {
      console.log(error.message);
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async findPatientByMobileNumber(mobile: string, companyId: number) {
    try {
      const patientList = await this.prisma.patient.findMany({
        where: {
          companyId,
          contactNumber: {
            contains: mobile,
          },
        },
      });
      return successHandler(patientList, 'Success');
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async findAll(
    pageNumber: number,
    limit: number,
    search: string,
    companyId: number,
  ) {
    try {
      const needToSkip = (pageNumber - 1) * limit;
      const totalCount = await this.prisma.patient.count({
        where: {
          companyId,
          isDeleted: false,
        },
      });
      const patientList = await this.prisma.patient.findMany({
        where: {
          companyId: companyId,
          isDeleted: false,
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
            {
              address: {
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
        orderBy: {
          createdDate: 'desc',
        },
        skip: needToSkip || 0,
        take: limit,
      });
      // each patient investigation count and report download path
      let patientListToSend = [];
      for (const patient of patientList) {
        const invoices = await this.prisma.invoice.findMany({
          where: {
            companyId,
            patientId: patient.id,
          },
          select: {
            invoiceInvestigation: {
              select: {
                investigation: true,
                reportPath: true,
              },
            },
          },
        });
        let investigationCount = 0;
        let reportDownloadPath = [];
        for (const report of invoices) {
          investigationCount += report.invoiceInvestigation.length;
          if (report.invoiceInvestigation[0].reportPath !== null) {
            reportDownloadPath.push(report.invoiceInvestigation[0].reportPath);
          }
        }
        const onePatient = {
          id: patient.id,
          name: patient.name,
          gender: patient.gender,
          address: patient.address,
          contactNumber: patient.contactNumber,
          email: patient.email,
          age: patient.age,
          investigationCount,
          reportDownloadPath,
        };
        patientListToSend.push({ ...onePatient });
      }
      return successHandler(
        { pageNumber, limit, totalCount, data: patientListToSend },
        'Success',
      );
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async getTotalCount(ids: any, search: string) {
    try {
      const result = await this.prisma.patient.count({
        where: {
          id: {
            in: ids,
          },
          isDeleted: false,
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
            {
              address: {
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
      });
      return result;
    } catch (error) {
      console.log(error.message);
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.prisma.patient.findUnique({
        where: {
          id: id,
        },
        include: {
          invoice: true,
        },
      });
      return successHandler(result, 'Success');
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async update(id: number, updatePatientDto: CreatePatientDto) {
    try {
      const result = await this.prisma.patient.update({
        where: {
          id: id,
        },
        data: {
          ...updatePatientDto,
          lastModifiedDate: new Date(),
        },
      });
      return successHandler(result, 'Success');
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async remove(id: number) {
    try {
      const result = await this.prisma.patient.update({
        where: {
          id: id,
        },
        data: {
          isDeleted: true,
          lastModifiedDate: new Date(),
        },
      });
      return successHandler(result, 'Success');
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async patientLogin(patientLoginDto: PatientLoginDto) {
    try {
      const invoice = await this.prisma.invoice.findFirst({
        where: {
          reportId: patientLoginDto.reportId,
          mobileNumber: patientLoginDto.mobileNumber,
        },
        select: {
          id: true,
        },
      });
      if (!invoice.id) {
        return errorhandler(404, 'No Invoice found');
      }
      return successHandler({}, 'Success');
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async getPatientViewData(invoiceNumber: string, mobileNumber: string) {
    try {
      return await this.invoiceService.getPatientViewData(
        invoiceNumber,
        mobileNumber,
      );
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async downloadReport(id: number) {
    try {
      return await this.invoiceService.downloadFile(id);
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }
}
