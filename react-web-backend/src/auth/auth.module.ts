import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DBService } from 'src/db.service';
import { CompanyUsersModule } from '../companyUsers/companyUsers.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserRolesGuard } from './guards/roles.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
  imports: [
    forwardRef(() => CompanyUsersModule),
    CompanyUsersModule,
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
    DBService,
    UserRolesGuard,
    JwtAuthGuard
  ],
  exports: [AuthService],
})
export class AuthModule {}
