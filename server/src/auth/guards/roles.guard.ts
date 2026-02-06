import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

type RequestWithUser = Request & { user?: { role?: string } };

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles?.length) return true;
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const { user } = request;
    if (!user?.role) throw new ForbiddenException();
    const hasRole = requiredRoles.includes(user.role);
    if (!hasRole) throw new ForbiddenException();
    return true;
  }
}
