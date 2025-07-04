import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { Usuario } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async criarUsuario(data: {
    nome: string;
    email: string;
    senha: string;
    papel: string;
  }): Promise<Usuario> {
    const senhaCriptografada = await bcrypt.hash(data.senha, 10);
    return await this.prisma.usuario.create({
      data: {
        nome: data.nome,
        email: data.email,
        senha: senhaCriptografada,
        papel: data.papel,
      },
    });
  }

  async findAll(): Promise<Partial<Usuario>[]> {
    return await this.prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        papel: true,
      },
    });
  }

  async findOne(id: number): Promise<Partial<Usuario> | null> {
    return await this.prisma.usuario.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        email: true,
        papel: true,
      },
    });
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return await this.prisma.usuario.findFirst({
      where: { email },
    });
  }

  async update(id: number, data: Partial<Usuario>): Promise<Usuario> {
    return await this.prisma.usuario.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Usuario> {
    return await this.prisma.usuario.delete({
      where: { id },
    });
  }
}
