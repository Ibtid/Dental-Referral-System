import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { DBService } from '../database.service';
import { UserService } from '../user/user.service';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, DBService, UserService],
})
export class CompanyModule {}
