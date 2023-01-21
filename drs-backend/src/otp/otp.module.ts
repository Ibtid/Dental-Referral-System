import { Module } from '@nestjs/common';
import { DBService } from '../database.service';
import { OtpService } from './otp.service';

@Module({
  providers: [OtpService, DBService],
})
export class OtpModule {}
