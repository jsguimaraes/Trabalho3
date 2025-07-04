import { Module } from '@nestjs/common';
import { PerfilController } from './perfil.controller';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma.service';
 
@Module({
  controllers: [PerfilController],
  providers: [UsersService, PrismaService],
})
export class PerfilModule {} 