import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { DBService } from '../database.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [UserModule],
  controllers: [RoleController],
  providers: [RoleService, DBService, UserService],
})
export class RoleModule {}
