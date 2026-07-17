/**
 * GetUser Decorator
 * Extracts the authenticated user from the request object (injected by JwtAuthGuard).
 * Usage: @GetUser() user: UserPayload
 *
 * Related: src/common/guards/jwt-auth.guard.ts, src/common/strategies/jwt.strategy.ts
 * Pattern: NestJS custom parameter decorator
 */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export interface UserPayload {
  sub: number;
  email: string;
  role: string;
}

export const GetUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): UserPayload => {
    const request = ctx.switchToHttp().getRequest<Request & { user: UserPayload }>();
    return request.user;
  },
);
