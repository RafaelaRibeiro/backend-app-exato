// role.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log('Roles necessários para acessar o recurso:', roles);

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log('Roles do usuário:', user.roles);

    if (!roles) return true;
    if (!user.roles) return false;

    return roles.some((role) => user.roles.includes(role));
  }
}
