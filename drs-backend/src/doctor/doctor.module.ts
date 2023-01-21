import { Module } from '@nestjs/common';
import { DBService } from '../database.service';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';

@Module({
  controllers: [DoctorController],
  providers: [DoctorService, DBService],
})
export class DoctorModule {}
