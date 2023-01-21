import { Module } from '@nestjs/common';
import { CompanyUsersService } from './companyUsers.service';
import { CompanyUsersController } from './companyUsers.controller';
import { DBService } from 'src/db.service';

@Module({
  controllers: [CompanyUsersController],
  providers: [CompanyUsersService, DBService],
  exports: [CompanyUsersService],
})
export class CompanyUsersModule {}
