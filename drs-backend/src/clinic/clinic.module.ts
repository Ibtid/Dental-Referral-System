import { Module } from '@nestjs/common';
import { ClinicService } from './clinic.service';
import { ClinicController } from './clinic.controller';
import { DBService } from '../database.service';
import { JwtModule } from '@nestjs/jwt';
import { Passport } from 'passport';
import { OtpService } from '../otp/otp.service';
import { SmsLogService } from '../sms-log/sms-log.service';
import { InvoiceService } from '../invoice/invoice.service';
import { UserService } from 'src/user/user.service';
import { CompanyUsersService } from 'src/companyUsers/company-users.service';

@Module({
  imports: [Passport, JwtModule.register({})],
  controllers: [ClinicController],
  providers: [
    ClinicService,
    DBService,
    OtpService,
    SmsLogService,
    InvoiceService,
    UserService,
    CompanyUsersService,
  ],
})
export class ClinicModule {}
