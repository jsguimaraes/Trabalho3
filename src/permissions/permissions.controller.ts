import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('permissions')
@UseGuards(JwtAuthGuard)
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post('conceder')
  async concederPermissao(
    @Body() data: { usuarioId: number; moduloId: number },
    @Request() req
  ) {
    return await this.permissionsService.concederPermissao(
      data.usuarioId,
      data.moduloId,
      req.user
    );
  }

  @Post('revogar')
  async revogarPermissao(
    @Body() data: { usuarioId: number; moduloId: number },
    @Request() req
  ) {
    return await this.permissionsService.revogarPermissao(
      data.usuarioId,
      data.moduloId,
      req.user
    );
  }

  @Get('usuario/:id')
  async listarPermissoesUsuario(@Param('id') id: string) {
    return await this.permissionsService.listarPermissoesUsuario(parseInt(id));
  }

  @Get('modulos')
  async listarTodosModulos() {
    return await this.permissionsService.listarTodosModulos();
  }

  @Get('usuarios')
  async listarUsuariosComPermissoes() {
    return await this.permissionsService.listarUsuariosComPermissoes();
  }
} 