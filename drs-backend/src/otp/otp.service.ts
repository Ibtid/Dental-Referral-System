import { Injectable } from '@nestjs/common';
import { DBService } from '../database.service';

@Injectable()
export class OtpService {
  constructor(private readonly prisma: DBService) {}
  async create(otp: string, mobile: string) {
    try {
      let lastDay: string | number = Date.now() - 24 * 60 * 60 * 1000;
      lastDay = new Date(lastDay).toISOString();
      const otpCount = await this.prisma.otp.count({
        where: {
          mobile,
          createdDate: {
            gte: lastDay,
          },
        },
      });
      // if (otpCount < 5) {
      console.log(otp);
      await this.prisma.otp.create({
        data: {
          otp,
          mobile,
        },
      });
      return true;
      // }
      // return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async verifyCode(mobile: string, code: string) {
    try {
      const [otpInfo] = await this.prisma.otp.findMany({
        where: {
          mobile,
        },
        orderBy: {
          createdDate: 'desc',
        },
        take: 1,
      });
      if (
        otpInfo.otp !== code ||
        Date.parse(new Date().toUTCString()) -
          Date.parse(otpInfo.createdDate.toUTCString()) >
          120_000
      ) {
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
