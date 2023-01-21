import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';

@Injectable()
export class ClinicTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-clinic',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.CLINIC_TOKEN_SECRET,
      ignoreExpiration: false,
    });
  }

  validate(payload: any) {
    return { ...payload };
  }
}
