import { Module } from '@nestjs/common';
import { CompanyUsersService } from 'src/companyUsers/companyUsers.service';
import { DBService } from 'src/db.service';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  controllers: [RoleController],
  providers: [RoleService, DBService, CompanyUsersService],
})
export class RoleModule {}
