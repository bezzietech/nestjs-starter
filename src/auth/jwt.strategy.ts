import { User, users } from '@clerk/clerk-sdk-node';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
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

export type CurrentUserType = User & Payload;
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.pk,
    });
  }

  async validate(payload: Payload) {
    try {
      const user = await users.getUser(payload.id);
      return user;
    } catch (error) {
      console.error('Error in validation :: ', error);
      throw new InternalServerErrorException('');
    }
  }
}
