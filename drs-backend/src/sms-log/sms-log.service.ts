import { Injectable } from '@nestjs/common';
import { DBService } from '../database.service';
import { errorhandler, successHandler } from '../util/response.handler';
import { sendSms } from '../util/sms-service';
import { StatusMessage } from '../util/status-message';
import { Prisma, SmsStatus } from '@prisma/client';

@Injectable()
export class SmsLogService {
  constructor(private readonly prisma: DBService) {}

  async create(
    prisma: Prisma.TransactionClient,
    mobile: string,
    sms: string,
    clinicId: number | undefined,
    companyId: number,
    type: string,
  ) {
    const smsResult = await sendSms(mobile, sms);
    await prisma.smsLog.create({
      data: {
        receiverPhone: mobile,
        message: sms,
        clinicId,
        companyId,
        status: smsResult === true ? SmsStatus.Sent : SmsStatus.Failed,
        statusMessage:
          smsResult === true ? StatusMessage.success : StatusMessage.stack,
        type,
      },
    });
  }

  async clinicSmsByType(
    clinicId: number,
    type: string,
    pageNumber: number,
    limit: number,
    search: string,
  ) {
    try {
      const totalCount = await this.prisma.smsLog.count({
        where: {
          clinicId,
          type,
          isDeleted: false,
        },
      });
      const needToSkip = (pageNumber - 1) * limit;
      const result = await this.prisma.smsLog.findMany({
        skip: needToSkip || 0,
        take: limit || 10,
        where: {
          clinicId,
          type,
        },
        orderBy: {
          timeStamp: 'desc',
        },
        select: {
          id: true,
          receiverPhone: true,
          message: true,
          timeStamp: true,
          status: true,
          statusMessage: true,
        },
      });
      return { pageNumber, limit, totalCount, data: result };
    } catch (error) {
      console.log(error.message);
    }
  }

  async findManyUsingCompanyId(
    companyId: number,
    type: string,
    pageNumber: number,
    limit: number,
  ) {
    try {
      const totalCount = await this.prisma.smsLog.count({
        where: {
          companyId,
          isDeleted: false,
          type: type || undefined,
        },
      });
      const needToSkip = (pageNumber - 1) * limit;
      const result = await this.prisma.smsLog.findMany({
        skip: needToSkip || 0,
        take: limit || 10,
        where: {
          companyId,
          type: type || undefined,
        },
        select: {
          clinic: {
            select: {
              id: true,
              name: true,
            },
          },
          companyId: true,
          createdDate: true,
          id: true,
          isDeleted: true,
          lastModifiedBy: true,
          lastModifiedDate: true,
          message: true,
          receiverPhone: true,
          status: true,
          statusMessage: true,
          timeStamp: true,
          type: true,
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

  async removeAllSms() {
    try {
      const result = await this.prisma.smsLog.deleteMany();
      return successHandler(result, 'Success');
    } catch (error) {
      return errorhandler(400, JSON.stringify(error.message));
    }
  }
}
