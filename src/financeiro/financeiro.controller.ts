import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { PermissionGuard } from '../guards/permission.guard';

@Controller('financeiro')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class FinanceiroController {
  
  @Get()
  async getFinanceiro(@Request() req) {
    return {
      message: 'Módulo Financeiro - Acesso Concedido',
      usuario: req.user.nome,
      papel: req.user.papel,
      data: new Date().toISOString(),
      dados: {
        saldo: 15000.00,
        receitas: 25000.00,
        despesas: 10000.00,
        lucro: 15000.00
      }
    };
  }

  @Post('transacao')
  async criarTransacao(@Body() data: any, @Request() req) {
    return {
      message: 'Transação criada com sucesso',
      usuario: req.user.nome,
      transacao: {
        id: Math.floor(Math.random() * 1000),
        valor: data.valor,
        tipo: data.tipo,
        descricao: data.descricao,
        data: new Date().toISOString()
      }
    };
  }

  @Get('relatorio')
  async getRelatorioFinanceiro(@Request() req) {
    return {
      message: 'Relatório Financeiro - Acesso Concedido',
      usuario: req.user.nome,
      relatorio: {
        periodo: 'Janeiro 2024',
        receitas: 25000.00,
        despesas: 10000.00,
        lucro: 15000.00,
        transacoes: [
          { id: 1, descricao: 'Venda Produto A', valor: 5000.00, tipo: 'receita' },
          { id: 2, descricao: 'Compra Matéria Prima', valor: 2000.00, tipo: 'despesa' }
        ]
      }
    };
  }
} 