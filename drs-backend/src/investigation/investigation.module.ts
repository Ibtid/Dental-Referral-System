import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { DBService } from '../database.service';
import { InvestigationController } from './investigation.controller';
import { InvestigationService } from './investigation.service';

@Module({
  controllers: [InvestigationController],
  providers: [InvestigationService, DBService, UserService],
})
export class InvestigationModule {}
