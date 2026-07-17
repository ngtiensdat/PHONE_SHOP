/**
 * Roles Decorator
 * Sets required roles metadata on a controller or route handler.
 * Consumed by RolesGuard to check against the authenticated user's role.
 *
 * Usage: @Roles(UserRole.ADMIN, UserRole.STAFF)
 * Related: src/common/guards/roles.guard.ts
 * Pattern: NestJS SetMetadata decorator
 */
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: string[]): MethodDecorator & ClassDecorator =>
  SetMetadata(ROLES_KEY, roles);
