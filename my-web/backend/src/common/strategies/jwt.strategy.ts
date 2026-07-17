/**
 * JwtStrategy
 * Passport strategy for validating JWT Access Token from Authorization Bearer header.
 * Decodes the token and attaches user payload to request.user.
 *
 * Related: src/common/guards/jwt-auth.guard.ts, src/config/app.config.ts
 * Pattern: PassportStrategy extending Strategy from passport-jwt
 */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserPayload } from '../decorators/get-user.decorator';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: (() => {
        const secret = configService.get<string>('jwt.accessSecret');
        if (!secret) {
          throw new Error('JWT_ACCESS_SECRET is not configured in the environment');
        }
        return secret;
      })(),
    });
  }

  validate(payload: { sub: number; email: string; role: string }): UserPayload {
    return {
      sub: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
