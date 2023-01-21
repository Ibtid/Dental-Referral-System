import { Module } from '@nestjs/common';
import { CompanyUsersService } from './company-users.service';
import { CompanyUsersController } from './company-users.controller';
import { DBService } from '../database.service';
import { InvoiceService } from '../invoice/invoice.service';
import { SmsLogService } from '../sms-log/sms-log.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [CompanyUsersController],
  providers: [
    CompanyUsersService,
    SmsLogService,
    DBService,
    InvoiceService,
    UserService,
  ],
  exports: [CompanyUsersService],
})
export class CompanyUsersModule {}
