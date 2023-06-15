import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

type Payload = {
  active?: boolean;
  azp: string;
  exp: number;
  iat: number;
  id: string;
  iss: string;
  jti: string;
  nbf: number;
  role?: string;
  sub: string;
};

export type CurrentUserType = Payload;
@Injectable()
export class InactiveJwtStrategy extends PassportStrategy(
  Strategy,
  'inactive-jwt',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.pk,
    });
  }

  validate(payload: Payload) {
    return payload;
  }
}
