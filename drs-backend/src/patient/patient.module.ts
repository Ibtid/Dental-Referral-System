import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { DBService } from '../database.service';
import { InvoiceService } from 'src/invoice/invoice.service';
import { SmsLogService } from 'src/sms-log/sms-log.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [PatientController],
  providers: [PatientService, DBService, InvoiceService, SmsLogService, UserService],
})
export class PatientModule {}
