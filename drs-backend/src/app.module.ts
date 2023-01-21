import { Module } from '@nestjs/common';
import { CompanyUsersModule } from './companyUsers/company-users.module';
import { SysadminsModule } from './sysadmins/sysadmins.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from './role/role.module';
import { CompanyModule } from './company/company.module';
import { CompanyUsersController } from './companyUsers/company-users.controller';
import { TestModule } from './test/test.module';
import { InvestigationModule } from './investigation/investigation.module';
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';
import { ClinicModule } from './clinic/clinic.module';
import { SmsLogModule } from './sms-log/sms-log.module';
import { OtpModule } from './otp/otp.module';
import { UserModule } from './user/user.module';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [
    CompanyUsersModule,
    SysadminsModule,
    AuthModule,
    RoleModule,
    ConfigModule.forRoot(),
    CompanyModule,
    TestModule,
    InvestigationModule,
    PatientModule,
    DoctorModule,
    ClinicModule,
    SmsLogModule,
    OtpModule,
    InvoiceModule,
    UserModule,
  ],
  controllers: [CompanyUsersController, AuthController],
  providers: [],
})
export class AppModule {}
