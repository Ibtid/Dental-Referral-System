import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtRefreshClinicGuard extends AuthGuard('jwt-refresh-clinic') {
  constructor() {
    super();
  }
}
