import { Module } from '@nestjs/common';
import { SmsLogService } from './sms-log.service';
import { SmsLogController } from './sms-log.controller';
import { DBService } from '../database.service';
import { CompanyUsersService } from '../companyUsers/company-users.service'; //'src/companyUsers/companyUsers.service';
import { UserService } from '../user/user.service';
import { InvoiceService } from '../invoice/invoice.service';

@Module({
  controllers: [SmsLogController],
  providers: [
    SmsLogService,
    DBService,
    CompanyUsersService,
    UserService,
    InvoiceService,
  ],
})
export class SmsLogModule {}
