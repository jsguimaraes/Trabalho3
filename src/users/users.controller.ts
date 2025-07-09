import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { PermissionGuard } from '../guards/permission.guard';

@Controller('users')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Request() req, @Body() body: any) {
    const solicitante = req.user;

    // Apenas superusuário pode criar administradores
    if (body.role === 'admin' && solicitante.role !== 'superuser') {
      throw new ForbiddenException('Apenas superusuário pode criar administradores.');
    }

    // Superusuário e administradores podem criar usuários comuns
    if (body.role === 'user' && !['superuser', 'admin'].includes(solicitante.role)) {
      throw new ForbiddenException('Apenas superusuário e administradores podem criar usuários.');
    }

    return this.usersService.createUser(body);
  }

  @Post('admin')
  async createAdmin(@Request() req, @Body() body: any) {
    const solicitante = req.user;

    if (solicitante.role !== 'superuser') {
      throw new ForbiddenException('Apenas superusuário pode criar administradores.');
    }

    return this.usersService.createAdmin(body);
  }

  @Post('regular')
  async createRegularUser(@Request() req, @Body() body: any) {
    const solicitante = req.user;

    if (!['superuser', 'admin'].includes(solicitante.role)) {
      throw new ForbiddenException('Apenas superusuário e administradores podem criar usuários.');
    }

    return this.usersService.createRegularUser(body);
  }

  @Get()
  async findAll(@Request() req) {
    const solicitante = req.user;

    // Apenas superusuário e administradores podem listar usuários
    if (!['superuser', 'admin'].includes(solicitante.role)) {
      throw new ForbiddenException('Apenas superusuário e administradores podem listar usuários.');
    }

    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    const solicitante = req.user;
    const usuarioId = parseInt(id);

    // Usuário pode ver seu próprio perfil
    if (solicitante.id === usuarioId) {
      return this.usersService.findOne(usuarioId);
    }

    // Apenas superusuário e administradores podem ver outros usuários
    if (!['superuser', 'admin'].includes(solicitante.role)) {
      throw new ForbiddenException('Apenas superusuário e administradores podem visualizar outros usuários.');
    }

    return this.usersService.findOne(usuarioId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Request() req) {
    const solicitante = req.user;
    const usuarioId = parseInt(id);

    // Usuário pode atualizar seu próprio perfil
    if (solicitante.id === usuarioId) {
      return this.usersService.update(usuarioId, updateUserDto);
    }

    // Apenas superusuário e administradores podem atualizar outros usuários
    if (!['superuser', 'admin'].includes(solicitante.role)) {
      throw new ForbiddenException('Apenas superusuário e administradores podem atualizar outros usuários.');
    }

    return this.usersService.update(usuarioId, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    const solicitante = req.user;
    const usuarioId = parseInt(id);

    // Usuário não pode deletar a si mesmo
    if (solicitante.id === usuarioId) {
      throw new ForbiddenException('Usuário não pode deletar a si mesmo.');
    }

    // Apenas superusuário pode deletar usuários
    if (solicitante.role !== 'superuser') {
      throw new ForbiddenException('Apenas superusuário pode deletar usuários.');
    }

    return this.usersService.remove(usuarioId);
  }
}
