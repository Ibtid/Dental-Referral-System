import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  getMonthsNameAndYearFromDate,
  subtractMonths,
} from '../util/dateFuntions';
import { jwtConstants } from '../auth/constants';
import { DBService } from '../database.service';
import { InvoiceService } from '../invoice/invoice.service';
import { OtpService } from '../otp/otp.service';
import { SmsLogService } from '../sms-log/sms-log.service';
import {
  created,
  errorhandler,
  successHandler,
  unauthorized,
} from '../util/response.handler';
import { sendSms } from '../util/sms-service';
import { SmsType } from '../util/sms-type';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';
import { Clinic, Partnership } from '@prisma/client';
import { CompanyUsersService } from '../companyUsers/company-users.service';

@Injectable()
export class ClinicService {
  constructor(
    private readonly prisma: DBService,
    private readonly jwtService: JwtService,
    private readonly otpService: OtpService,
    private readonly smsLogService: SmsLogService,
    private readonly invoiceService: InvoiceService,
    private readonly companyuserService: CompanyUsersService,
  ) {}
  async createPartnership(
    createClinicDto: CreateClinicDto,
    lastModifiedBy: number,
    companyId: number,
  ) {
    try {
      const result = await this.prisma.$transaction(async (prisma) => {
        let clinic: Clinic = await this.prisma.clinic.findFirst({
          where: {
            name: createClinicDto.name,
            email: createClinicDto.email,
            mobile: createClinicDto.mobile,
            isDeleted: false,
          },
        });

        if (!clinic) {
          clinic = await prisma.clinic.create({
            data: {
              name: createClinicDto.name,
              email: createClinicDto.email,
              mobile: createClinicDto.mobile,
              address: createClinicDto.address,
              status: createClinicDto.status,
              phone: createClinicDto.phone,
              latitude: createClinicDto.latitude,
              longitude: createClinicDto.longitude,
              lastModifiedBy,
            },
          });
        }
        let partnership: Partnership = await this.prisma.partnership.findFirst({
          where: {
            companyId,
            clinicId: clinic.id,
            isDeleted: false,
          },
        });
        if (partnership) {
          return errorhandler(400, 'Clinic exists in your record');
        }
        await prisma.partnership.create({
          data: {
            companyId,
            clinicId: clinic.id,
            lastModifiedBy,
          },
        });
        return clinic;
      });
      return created(result);
    } catch (error) {
      console.log(error);
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async login(mobile: string) {
    try {
      const clinicExist = await this.prisma.clinic.findFirst({
        where: {
          mobile,
        },
      });
      if (!clinicExist) {
        return errorhandler(404, 'Clinic not found');
      }
      return await this.sendOtp(mobile);
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async sendOtp(mobile: string) {
    try {
      // const otp = (Math.floor(Math.random() * 10_000) + 10_000)
      //   .toString()
      //   .slice(1);
      const otp = '5555';
      const writeOtp = await this.otpService.create(otp, mobile);
      if (writeOtp === true) {
        await sendSms(mobile, `Your OTP is ${otp}`);
        return successHandler({}, 'A code sent to your number');
      } else {
        return errorhandler(403, 'Maximum limit is 5 OTP in a day');
      }
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async verify(mobile: string, code: string, req: any, res: any) {
    try {
      const result = await this.otpService.verifyCode(mobile, code);
      if (result === true) {
        const clinicDetails = await this.prisma.clinic.findFirst({
          where: {
            mobile,
          },
        });
        const tokens = await this.getClinicTokens(clinicDetails.id, mobile);
        res.cookie('refreshToken', tokens.refresh_token, {
          expires: new Date(new Date().setDate(new Date().getDate() + 7)),
          // sameSite: 'none',
          httpOnly: true,
          // secure: false,
          domain: 'drsdev.kaz.com.bd',
          path: '/drs/auth/refresh',
        });
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        return successHandler(
          {
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            expires_in: jwtConstants.CLINIC_TOKEN_EXPIRATION,
            token_type: 'Bearer',
            clinicDetails,
          },
          'Success',
        );
      } else {
        return unauthorized();
      }
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async refreshTokens(mobile: string) {
    try {
      const clinicDetails = await this.prisma.clinic.findUnique({
        where: {
          mobile,
        },
      });
      if (!clinicDetails) throw new ForbiddenException('Access Denied');
      const tokens = await this.getClinicTokens(
        clinicDetails.id,
        clinicDetails.mobile,
      );
      return {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expires_in: jwtConstants.CLINIC_TOKEN_EXPIRATION,
        token_type: 'Bearer',
        clinicDetails,
      };
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
      const totalCount = await this.getTotalCountAllClinic(companyId, search);
      const needToSkip = (pageNumber - 1) * limit;
      const clinicList = await this.prisma.partnership.findMany({
        skip: needToSkip || 0,
        take: limit || 10,
        where: {
          companyId,
          isDeleted: false,
          clinic: {
            OR: [
              {
                name: {
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
              {
                mobile: {
                  contains: search,
                },
              },
            ],
          },
        },
        select: {
          clinic: {
            select: {
              id: true,
              name: true,
              mobile: true,
              email: true,
              phone: true,
              address: true,
              longitude: true,
              latitude: true,
              status: true,
              referralBonusPayment: {
                where: {
                  companyId,
                },
                select: {
                  paymentMonth: true,
                },
                orderBy: {
                  createdDate: 'desc',
                },
                take: 1,
              },
            },
          },
        },
        orderBy: {
          createdDate: 'desc',
        },
      });
      let clinicListToSend = [];
      for (const clinic of clinicList) {
        const date = clinic.clinic.referralBonusPayment[0]?.paymentMonth
          ? clinic.clinic.referralBonusPayment[0].paymentMonth
          : null;
        const lastDate = new Date(date);
        const dueAmount =
          await this.companyuserService.getDueAmountSinceLastPayment(
            clinic.clinic.id,
            companyId,
            lastDate,
          );
        const oneClinic = {
          id: clinic.clinic.id,
          name: clinic.clinic.name,
          address: clinic.clinic.address,
          email: clinic.clinic.email,
          mobile: clinic.clinic.mobile,
          phone: clinic.clinic.phone,
          latitude: clinic.clinic.latitude,
          longitude: clinic.clinic.longitude,
          status: clinic.clinic.status,
          dueAmount:
            dueAmount.comission - dueAmount.discount > 0
              ? dueAmount.comission - dueAmount.discount
              : 0,
        };
        clinicListToSend.push({ ...oneClinic });
      }
      return successHandler(
        { pageNumber, limit, totalCount, data: clinicListToSend },
        'Success',
      );
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async getTotalCountAllClinic(companyId: number, search: string) {
    return await this.prisma.partnership.count({
      where: {
        companyId,
        isDeleted: false,
        clinic: {
          OR: [
            {
              name: {
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
            {
              mobile: {
                contains: search,
              },
            },
          ],
        },
      },
    });
  }

  async patientTable(
    id: number,
    pageNumber: number,
    limit: number,
    search: string,
  ) {
    try {
      const referredPatient = await this.invoiceService.findByClinic(
        id,
        pageNumber,
        limit,
        search,
      );
      return successHandler(
        {
          pageNumber: referredPatient.pageNumber,
          limit: referredPatient.limit,
          totalCount: referredPatient.totalCount,
          data: referredPatient.data,
        },
        'Success',
      );
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }
  async paymentTable(
    id: number,
    pageNumber: number,
    limit: number,
    search: string,
  ) {
    try {
      const paymentMessages = await this.smsLogService.clinicSmsByType(
        id,
        SmsType.payment,
        pageNumber,
        limit,
        search,
      );

      return successHandler(
        {
          pageNumber: paymentMessages.pageNumber,
          limit: paymentMessages.limit,
          totalCount: paymentMessages.totalCount,
          data: paymentMessages.data,
        },
        'Success',
      );
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async profile(id: number) {
    try {
      const result = await this.prisma.clinic.findUnique({
        where: {
          id: id,
        },
      });
      return successHandler(result, 'Success');
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.prisma.clinic.findUnique({
        where: {
          id: id,
        },
      });
      return successHandler(result, 'Success');
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async update(
    id: number,
    updateClinicDto: UpdateClinicDto,
    companyId: number,
    lastModifiedBy: number,
  ) {
    try {
      const partnership = await this.prisma.partnership.findFirst({
        where: {
          clinicId: id,
          companyId,
          isDeleted: false,
        },
      });
      const result = await this.prisma.clinic.update({
        where: {
          id: partnership.clinicId,
        },
        data: {
          ...updateClinicDto,
          lastModifiedBy,
          lastModifiedDate: new Date(),
        },
      });
      return successHandler(result, 'Success');
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async remove(id: number, companyId: number, lastModifiedBy: number) {
    try {
      await this.prisma.partnership.updateMany({
        where: {
          clinicId: id,
          companyId,
        },
        data: {
          isDeleted: true,
          lastModifiedBy,
          lastModifiedDate: new Date(),
        },
      });
      return successHandler({}, 'Success');
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async getCardData(clinicId: number) {
    try {
      const referredPatient = await this.prisma.invoice.groupBy({
        by: ['patientId'],
        where: {
          clinicId,
        },
      });
      const invoices = await this.prisma.invoice.findMany({
        where: {
          clinicId,
        },
        select: {
          invoiceInvestigation: {
            select: {
              investigation: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

      const investigationCount =
        this.getInvestigationCountFromInvoices(invoices);

      const cardData = {
        totalReferredPatient: referredPatient.length,
        investigationCount,
      };
      return successHandler(cardData, 'Success');
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async getLineChartData(clinicId: number) {
    try {
      const invoices = await this.prisma.invoice.findMany({
        where: {
          clinicId,
          createdDate: {
            gte: subtractMonths(new Date(), 6),
          },
        },
        select: {
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
      const investigationPerMonth =
        this.getInvestigationPerMonthCount(invoices);

      let lineChartData: any = {
        name: 'Investigation Survey',
        xAxisKey: 'month',
        investigationsList: [],
        data: [],
      };

      investigationPerMonth.forEach((oneData: any) => {
        oneData.value.forEach((oneInvestigation) => {
          const existingInvestigation: boolean =
            lineChartData.investigationsList?.some((investigation: any) => {
              return investigation === oneInvestigation.key;
            });

          if (!existingInvestigation) {
            lineChartData.investigationsList.push(oneInvestigation.key);
          }
        });
      });

      lineChartData.investigationsList.map(
        (investigation: string, index: number) => {
          lineChartData[`area${index}Key`] = investigation;
        },
      );

      const testsWithInitialValue = () => {
        const modifiedList: any = {};
        lineChartData.investigationsList.forEach((investigation: string) => {
          modifiedList[investigation] = 0;
        });
        return modifiedList;
      };

      investigationPerMonth
        .slice(0)
        .reverse()
        .forEach((oneData) => {
          lineChartData.data.push({
            month: oneData.title,
            ...testsWithInitialValue(),
          });
          oneData.value.forEach((oneInvestigation: any) => {
            lineChartData.data.forEach((oneLineData: any, index: number) => {
              if (oneData.title === oneLineData.month) {
                console.log(oneInvestigation);
                lineChartData.data[index] = {
                  ...lineChartData.data[index],
                  [oneInvestigation.key]: oneInvestigation.value,
                };
              }
            });
          });
        });

      return successHandler(lineChartData, 'Success');
    } catch (error) {
      console.log(error);
      return errorhandler(400, JSON.stringify(error.message));
    }
  }

  async getClinicTokens(id: number, mobile: string) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        { sub: id, mobile },
        {
          secret: jwtConstants.CLINIC_TOKEN_SECRET,
          expiresIn: jwtConstants.CLINIC_TOKEN_EXPIRATION,
        },
      ),
      this.jwtService.signAsync(
        { sub: id, mobile },
        {
          secret: jwtConstants.CLINIC_REFRESH_TOKEN_SECRET,
          expiresIn: jwtConstants.CLINIC_REFRESH_TOKEN_EXPIRATION,
        },
      ),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }

  getInvestigationCountFromInvoices(invoices: any) {
    // const investigationCount = {};

    let investigationCount = [];

    invoices.map((invoice: any) => {
      invoice.invoiceInvestigation.map((oneInvoiceInvestigation: any) => {
        if (
          investigationCount.filter(
            (oneCount) =>
              oneCount.investigation ===
              oneInvoiceInvestigation.investigation.name,
          ).length > 0
        ) {
          /* vendors contains the element we're looking for */
          investigationCount.forEach((oneCount) => {
            if (
              oneCount.investigation ===
              oneInvoiceInvestigation.investigation.name
            ) {
              oneCount.count = oneCount.count + 1;
            }
          });
        } else {
          investigationCount.push({
            investigation: oneInvoiceInvestigation.investigation.name,
            count: 1,
          });
        }
      });
    });
    return investigationCount;
  }

  getInvestigationPerMonthCount(invoices: any) {
    const investigationPerMonthCount = [];
    for (let index = 0; index < 6; index++) {
      investigationPerMonthCount.push({
        title: getMonthsNameAndYearFromDate(new Date(), index),
        value: [],
      });
    }

    invoices.map((invoice: any) => {
      invoice.invoiceInvestigation.map((oneInvoiceInvestigation: any) => {
        const dateSearchIndex = investigationPerMonthCount.findIndex(
          (object: any) => {
            return (
              object.title ===
              getMonthsNameAndYearFromDate(invoice.createdDate, 0)
            );
          },
        );

        const investigationSearchIndex = investigationPerMonthCount[
          `${dateSearchIndex}`
        ].value.findIndex((object: any) => {
          return object.key === oneInvoiceInvestigation.investigation.name;
        });

        if (investigationSearchIndex !== -1) {
          investigationPerMonthCount[`${dateSearchIndex}`].value[
            `${investigationSearchIndex}`
          ].value++;
        } else {
          investigationPerMonthCount[`${dateSearchIndex}`].value.push({
            key: oneInvoiceInvestigation.investigation.name,
            value: 1,
          });
        }
      });
    });
    return investigationPerMonthCount;
  }
}
