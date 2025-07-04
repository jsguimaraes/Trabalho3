import { Controller, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { PermissionGuard } from '../guards/permission.guard';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Controller('perfil')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class PerfilController {
  constructor(private readonly usersService: UsersService) {}
  
  @Get()
  async getPerfil(@Request() req) {
    const usuario = await this.usersService.findOne(req.user.id);
    
    return {
      message: 'Módulo de Perfil - Acesso Concedido',
      usuario: req.user.nome,
      papel: req.user.papel,
      data: new Date().toISOString(),
      perfil: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        papel: usuario.papel,
        avatar: usuario.avatar,
        dataCriacao: usuario.createdAt,
        ultimaAtualizacao: usuario.updatedAt
      }
    };
  }

  @Put()
  async atualizarPerfil(@Body() data: any, @Request() req) {
    const dadosAtualizacao: any = {};
    
    if (data.nome) dadosAtualizacao.nome = data.nome;
    if (data.email) dadosAtualizacao.email = data.email;
    if (data.avatar) dadosAtualizacao.avatar = data.avatar;
    
    if (data.senha) {
      dadosAtualizacao.senha = await bcrypt.hash(data.senha, 10);
    }

    const usuarioAtualizado = await this.usersService.update(req.user.id, dadosAtualizacao);

    return {
      message: 'Perfil atualizado com sucesso',
      usuario: req.user.nome,
      perfil: {
        id: usuarioAtualizado.id,
        nome: usuarioAtualizado.nome,
        email: usuarioAtualizado.email,
        papel: usuarioAtualizado.papel,
        avatar: usuarioAtualizado.avatar,
        dataAtualizacao: new Date().toISOString()
      }
    };
  }

  @Get('permissoes')
  async getPermissoesPerfil(@Request() req) {
    // Buscar permissões do usuário
    const permissoes = await this.usersService.findPermissoes(req.user.id);
    
    return {
      message: 'Permissões do Perfil - Acesso Concedido',
      usuario: req.user.nome,
      permissoes: permissoes
    };
  }
} 