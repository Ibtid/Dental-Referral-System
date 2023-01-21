import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtClinicTokenGuard extends AuthGuard('jwt-clinic') {
  constructor() {
    super();
  }
}
