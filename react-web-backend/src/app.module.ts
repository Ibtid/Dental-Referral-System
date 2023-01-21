import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CompanyUsersModule } from './companyUsers/companyUsers.module';
import { SysadminsModule } from './sysadmins/sysadmins.module';
import { AuthModule } from './auth/auth.module';
import { DBService } from './db.service';
import { AuthController } from './auth/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { CompanyUsersController } from './companyUsers/companyUsers.controller';
import { APP_GUARD } from '@nestjs/core';
import { UserRolesGuard } from './auth/guards/roles.guard';
import { TestModule } from './test/test.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    CompanyUsersModule,
    SysadminsModule,
    AuthModule,
    ConfigModule.forRoot(),
    TestModule,
    RoleModule,
  ],
  controllers: [CompanyUsersController, AuthController],
  providers: [],
})
export class AppModule {}
