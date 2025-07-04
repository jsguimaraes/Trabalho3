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
      throw new ForbiddenException('Usuário não autenticado');
    }

    // Obter o módulo da rota
    const modulo = this.getModuloFromRoute(request.route?.path || request.url);
    
    if (!modulo) {
      return true; // Se não há módulo específico, permite acesso
    }

    // Verificar se o usuário tem permissão para o módulo
    const temPermissao = await this.verificarPermissao(user.id, modulo, user.papel);
    
    // Registrar o acesso
    await this.registrarAcesso(user.id, modulo, request.route?.path || request.url, temPermissao, request);

    if (!temPermissao) {
      throw new ForbiddenException(`SEM PERMISSÃO PARA ACESSAR O MÓDULO ${modulo.toUpperCase()}`);
    }

    return true;
  }

  private getModuloFromRoute(path: string): string | null {
    const modulos = ['usuarios', 'perfil', 'financeiro', 'relatorios', 'produtos'];
    
    for (const modulo of modulos) {
      if (path.includes(`/${modulo}`)) {
        return modulo;
      }
    }
    
    return null;
  }

  private async verificarPermissao(usuarioId: number, modulo: string, papel: string): Promise<boolean> {
    // Superusuário tem acesso a tudo
    if (papel === 'superusuario') {
      return true;
    }

    // Administradores têm acesso a tudo exceto gestão de usuários
    if (papel === 'administrador') {
      if (modulo === 'usuarios') {
        return false;
      }
      return true;
    }

    // Usuários comuns precisam de permissão explícita
    if (papel === 'usuario') {
      // Módulo de perfil é sempre acessível pelo próprio usuário
      if (modulo === 'perfil') {
        return true;
      }

      // Verificar permissão explícita no banco
      const permissao = await this.prisma.permissao.findFirst({
        where: {
          usuarioId,
          modulo: {
            nome: modulo
          },
          ativo: true
        },
        include: {
          modulo: true
        }
      });

      return !!permissao;
    }

    return false;
  }

  private async registrarAcesso(
    usuarioId: number, 
    modulo: string, 
    rota: string, 
    permitido: boolean, 
    request: any
  ): Promise<void> {
    try {
      await this.prisma.acesso.create({
        data: {
          usuarioId,
          modulo,
          rota,
          permitido,
          ip: request.ip,
          userAgent: request.headers['user-agent'],
        }
      });
    } catch (error) {
      console.error('Erro ao registrar acesso:', error);
    }
  }
} 