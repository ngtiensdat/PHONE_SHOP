/**
 * JwtAuthGuard
 * Protects routes by validating the JWT Access Token from the Authorization header (Bearer).
 * Throws 401 UnauthorizedException on invalid/expired token.
 *
 * Related: src/common/strategies/jwt.strategy.ts
 * Pattern: NestJS AuthGuard('jwt') extension
 */
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest<TUser>(err: Error | null, user: TUser): TUser {
    if (err || !user) {
      throw err ?? new UnauthorizedException('Token không hợp lệ hoặc đã hết hạn');
    }
    return user;
  }
}
