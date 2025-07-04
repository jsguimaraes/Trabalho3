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
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/guards/role.decorator';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async criarUsuario(@Request() req, @Body() body: any) {
    const solicitante = req.user;

    if (solicitante.papel !== 'SUPERUSUARIO' && solicitante.papel !== 'ADMIN') {
      throw new ForbiddenException('Apenas SUPERUSUARIO ou ADMIN pode criar usuários.');
    }

    return this.usersService.criarUsuario(body);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(RoleGuard)
  @Roles(...['admin', 'gerente', 'tecnico']) // TODO PENSAR EM ALGO COMO @RoleGuard("admin", "gerente", "tecnico")
  @UseGuards(AuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  // @RolesGuard("admin") // Verifica se o usuário é admin
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
