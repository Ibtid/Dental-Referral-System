import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';

@Injectable()
export class ClinicRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-clinic',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.CLINIC_REFRESH_TOKEN_SECRET,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  validate(request: Request, payload: any) {
    const refreshToken = request
      .get('authorization')
      .replace('Bearer', '')
      .trim();
    return { ...payload, refreshToken };
  }
}
