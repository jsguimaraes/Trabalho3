import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PermissionsService {
  constructor(private readonly prisma: PrismaService) {}

  async grantPermission(userId: number, moduleName: string, loggedUser: any) {
    // Verificar se o usuário logado pode conceder permissões
    if (!['superuser', 'admin'].includes(loggedUser.role)) {
      throw new ForbiddenException('Only superusers and admins can grant permissions');
    }

    // Verificar se o usuário existe
    const user = await this.prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Verificar se o módulo existe
    const module = await this.prisma.module.findUnique({
      where: { name: moduleName }
    });

    if (!module) {
      throw new NotFoundException('Module not found');
    }

    // Criar ou atualizar permissão
    const permission = await this.prisma.permission.upsert({
      where: {
        userId_moduleId: {
          userId,
          moduleId: module.id
        }
      },
      update: {
        active: true
      },
      create: {
        userId,
        moduleId: module.id,
        active: true
      }
    });

    return permission;
  }

  async revokePermission(userId: number, moduleName: string, loggedUser: any) {
    // Verificar se o usuário logado pode revogar permissões
    if (!['superuser', 'admin'].includes(loggedUser.role)) {
      throw new ForbiddenException('Only superusers and admins can revoke permissions');
    }

    // Verificar se o módulo existe
    const module = await this.prisma.module.findUnique({
      where: { name: moduleName }
    });

    if (!module) {
      throw new NotFoundException('Module not found');
    }

    const permission = await this.prisma.permission.findUnique({
      where: {
        userId_moduleId: {
          userId,
          moduleId: module.id
        }
      }
    });

    if (!permission) {
      throw new NotFoundException('Permission not found');
    }

    await this.prisma.permission.update({
      where: { id: permission.id },
      data: { active: false }
    });

    return { message: 'Permission revoked successfully' };
  }

  async listUserPermissions(userId: number) {
    const permissions = await this.prisma.permission.findMany({
      where: {
        userId,
        active: true
      },
      include: {
        module: true
      }
    });

    return permissions;
  }

  async listAllModules() {
    return await this.prisma.module.findMany({
      where: { active: true }
    });
  }

  async listUsersWithPermissions() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        permissions: {
          where: { active: true },
          include: {
            module: true
          }
        }
      }
    });

    return users;
  }
} 