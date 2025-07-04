import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Sistema de Controle de Acesso - API Funcionando!';
  }

  async onModuleInit() {
    await this.inicializarSistema();
  }

  private async inicializarSistema() {
    // Criar superusuário se não existir
    await this.criarSuperusuario();
    
    // Criar módulos fixos se não existirem
    await this.criarModulosFixos();
  }

  private async criarSuperusuario() {
    const superusuarioExistente = await this.prisma.usuario.findFirst({
      where: { papel: 'superusuario' }
    });

    if (!superusuarioExistente) {
      const senhaCriptografada = await bcrypt.hash('admin123', 10);
      
      await this.prisma.usuario.create({
        data: {
          nome: 'Super Administrador',
          email: 'admin@sistema.com',
          senha: senhaCriptografada,
          papel: 'superusuario',
        }
      });

      console.log('✅ Superusuário criado: admin@sistema.com / admin123');
    }
  }

  private async criarModulosFixos() {
    const modulosFixos = [
      { nome: 'usuarios', descricao: 'Gestão de Usuários' },
      { nome: 'perfil', descricao: 'Módulo de Perfil' },
      { nome: 'financeiro', descricao: 'Módulo Financeiro' },
      { nome: 'relatorios', descricao: 'Módulo de Relatórios' },
      { nome: 'produtos', descricao: 'Módulo de Produtos' },
    ];

    for (const modulo of modulosFixos) {
      const moduloExistente = await this.prisma.modulo.findUnique({
        where: { nome: modulo.nome }
      });

      if (!moduloExistente) {
        await this.prisma.modulo.create({
          data: modulo
        });
        console.log(`✅ Módulo criado: ${modulo.nome}`);
      }
    }
  }
}
