/**
 * RolesGuard
 * Checks if the authenticated user's role matches the required roles set by @Roles() decorator.
 * Must be used AFTER JwtAuthGuard (request.user must be populated).
 *
 * Related: src/common/decorators/roles.decorator.ts, src/common/guards/jwt-auth.guard.ts
 * Pattern: NestJS CanActivate with Reflector
 */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserPayload } from '../decorators/get-user.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context
      .switchToHttp()
      .getRequest<Request & { user: UserPayload }>();

    const user = request.user;

    return requiredRoles.some((role) => user?.role === role);
  }
}
