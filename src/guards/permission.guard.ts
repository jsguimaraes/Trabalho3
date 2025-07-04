import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    // Get module from route
    const module = this.getModuleFromRoute(request.route?.path || request.url);
    
    if (!module) {
      return true; // If no specific module, allow access
    }

    // Check if user has permission for the module
    const hasPermission = await this.checkPermission(user.id, module, user.role);
    
    // Register access
    await this.registerAccess(user.id, module, request.route?.path || request.url, hasPermission, request);

    if (!hasPermission) {
      throw new ForbiddenException(`NO PERMISSION TO ACCESS ${module.toUpperCase()} MODULE`);
    }

    return true;
  }

  private getModuleFromRoute(path: string): string | null {
    const modules = ['users', 'profile', 'financial', 'reports', 'products'];
    
    for (const module of modules) {
      if (path.includes(`/${module}`)) {
        return module;
      }
    }
    
    return null;
  }

  private async checkPermission(userId: number, module: string, role: string): Promise<boolean> {
    // Superuser has access to everything
    if (role === 'superuser') {
      return true;
    }

    // Admins have access to everything except user management
    if (role === 'admin') {
      if (module === 'users') {
        return false;
      }
      return true;
    }

    // Common users need explicit permission
    if (role === 'user') {
      // Profile module is always accessible by the user themselves
      if (module === 'profile') {
        return true;
      }

      // Check explicit permission in database
      const permission = await this.prisma.permission.findFirst({
        where: {
          userId: userId,
          module: {
            name: module
          },
          active: true
        },
        include: {
          module: true
        }
      });

      return !!permission;
    }

    return false;
  }

  private async registerAccess(
    userId: number, 
    module: string, 
    route: string, 
    permitted: boolean, 
    request: any
  ): Promise<void> {
    try {
      await this.prisma.access.create({
        data: {
          userId: userId,
          module: module,
          route: route,
          permitted: permitted,
          ip: request.ip,
          userAgent: request.headers['user-agent'],
        }
      });
    } catch (error) {
      console.error('Error registering access:', error);
    }
  }
} 