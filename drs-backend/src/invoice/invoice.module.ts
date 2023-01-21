import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { DBService } from '../database.service';
import { SmsLogService } from '../sms-log/sms-log.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [InvoiceController],
  providers: [InvoiceService, DBService, SmsLogService, UserService],
})
export class InvoiceModule {}
