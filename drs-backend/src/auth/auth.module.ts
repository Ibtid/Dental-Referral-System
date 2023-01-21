import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ClinicService } from 'src/clinic/clinic.service';
import { CompanyUsersService } from 'src/companyUsers/company-users.service';
import { InvoiceService } from 'src/invoice/invoice.service';
import { OtpService } from 'src/otp/otp.service';
import { SmsLogService } from 'src/sms-log/sms-log.service';
import { DBService } from '../database.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtClinicTokenGuard } from './guards/jwt-clinic.guard';
import { UserRolesGuard } from './guards/roles.guard';
import { ClinicRefreshTokenStrategy } from './strategies/clinic-refresh-token.strategy';
import { ClinicTokenStrategy } from './strategies/clinic-token.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
  imports: [
    forwardRef(() => UserModule),
    UserModule,
    PassportModule,
    JwtModule.register({
      /*secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expires_in + 's' },*/
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshTokenStrategy,
    ClinicTokenStrategy,
    ClinicRefreshTokenStrategy,
    DBService,
    UserRolesGuard,
    JwtAuthGuard,
    JwtClinicTokenGuard,
    UserService,
    ClinicService,
    OtpService,
    SmsLogService,
    InvoiceService,
    CompanyUsersService
  ],
  exports: [AuthService],
})
export class AuthModule {}
