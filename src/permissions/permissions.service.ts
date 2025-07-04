import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PermissionsService {
  constructor(private readonly prisma: PrismaService) {}

  async concederPermissao(usuarioId: number, moduloId: number, usuarioLogado: any) {
    // Verificar se o usuário logado pode conceder permissões
    if (!['superusuario', 'administrador'].includes(usuarioLogado.papel)) {
      throw new ForbiddenException('Apenas superusuários e administradores podem conceder permissões');
    }

    // Verificar se o usuário existe
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: usuarioId }
    });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Verificar se o módulo existe
    const modulo = await this.prisma.modulo.findUnique({
      where: { id: moduloId }
    });

    if (!modulo) {
      throw new NotFoundException('Módulo não encontrado');
    }

    // Criar ou atualizar permissão
    const permissao = await this.prisma.permissao.upsert({
      where: {
        usuarioId_moduloId: {
          usuarioId,
          moduloId
        }
      },
      update: {
        ativo: true
      },
      create: {
        usuarioId,
        moduloId,
        ativo: true
      }
    });

    return permissao;
  }

  async revogarPermissao(usuarioId: number, moduloId: number, usuarioLogado: any) {
    // Verificar se o usuário logado pode revogar permissões
    if (!['superusuario', 'administrador'].includes(usuarioLogado.papel)) {
      throw new ForbiddenException('Apenas superusuários e administradores podem revogar permissões');
    }

    const permissao = await this.prisma.permissao.findUnique({
      where: {
        usuarioId_moduloId: {
          usuarioId,
          moduloId
        }
      }
    });

    if (!permissao) {
      throw new NotFoundException('Permissão não encontrada');
    }

    await this.prisma.permissao.update({
      where: { id: permissao.id },
      data: { ativo: false }
    });

    return { message: 'Permissão revogada com sucesso' };
  }

  async listarPermissoesUsuario(usuarioId: number) {
    const permissoes = await this.prisma.permissao.findMany({
      where: {
        usuarioId,
        ativo: true
      },
      include: {
        modulo: true
      }
    });

    return permissoes;
  }

  async listarTodosModulos() {
    return await this.prisma.modulo.findMany({
      where: { ativo: true }
    });
  }

  async listarUsuariosComPermissoes() {
    const usuarios = await this.prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        papel: true,
        permissoes: {
          where: { ativo: true },
          include: {
            modulo: true
          }
        }
      }
    });

    return usuarios;
  }
} 