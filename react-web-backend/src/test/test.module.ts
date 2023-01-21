import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { DBService } from 'src/db.service';
import { CompanyUsersService } from 'src/companyUsers/companyUsers.service';

@Module({
  controllers: [TestController],
  providers: [TestService, DBService, CompanyUsersService],
})
export class TestModule {}
