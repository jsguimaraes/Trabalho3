import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { PermissionGuard } from '../guards/permission.guard';

@Controller('relatorios')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class RelatoriosController {
  
  @Get()
  async getRelatorios(@Request() req) {
    return {
      message: 'Módulo de Relatórios - Acesso Concedido',
      usuario: req.user.nome,
      papel: req.user.papel,
      data: new Date().toISOString(),
      relatorios: [
        { id: 1, nome: 'Relatório de Vendas', tipo: 'vendas', status: 'disponivel' },
        { id: 2, nome: 'Relatório de Estoque', tipo: 'estoque', status: 'disponivel' },
        { id: 3, nome: 'Relatório Financeiro', tipo: 'financeiro', status: 'disponivel' }
      ]
    };
  }

  @Post('gerar')
  async gerarRelatorio(@Body() data: any, @Request() req) {
    return {
      message: 'Relatório gerado com sucesso',
      usuario: req.user.nome,
      relatorio: {
        id: Math.floor(Math.random() * 1000),
        tipo: data.tipo,
        periodo: data.periodo,
        dataGeracao: new Date().toISOString(),
        status: 'concluido',
        url: `/relatorios/${Math.floor(Math.random() * 1000)}.pdf`
      }
    };
  }

  @Get('vendas')
  async getRelatorioVendas(@Request() req) {
    return {
      message: 'Relatório de Vendas - Acesso Concedido',
      usuario: req.user.nome,
      relatorio: {
        periodo: 'Janeiro 2024',
        totalVendas: 50000.00,
        quantidadeVendas: 150,
        produtosMaisVendidos: [
          { nome: 'Produto A', quantidade: 50, valor: 15000.00 },
          { nome: 'Produto B', quantidade: 30, valor: 12000.00 }
        ]
      }
    };
  }
} 