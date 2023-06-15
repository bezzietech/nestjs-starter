import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { InactiveJwtStrategy } from './inactive-jwt.strategy';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.pk,
    }),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService, InactiveJwtStrategy],
})
export class AuthModule {}
