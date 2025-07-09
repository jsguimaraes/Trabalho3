import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { PermissionGuard } from '../guards/permission.guard';

@Controller('financial')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class FinancialController {
  
  @Get()
  async getFinancial(@Request() req) {
    return {
      message: 'Financial Module - Access Granted',
      user: req.user.nome,
      role: req.user.role,
      date: new Date().toISOString(),
      data: {
        balance: 15000.00,
        income: 25000.00,
        expenses: 10000.00,
        profit: 15000.00
      }
    };
  }

  @Post('transaction')
  async createTransaction(@Body() data: any, @Request() req) {
    return {
      message: 'Transaction created successfully',
      user: req.user.nome,
      transaction: {
        id: Math.floor(Math.random() * 1000),
        value: data.valor,
        type: data.tipo,
        description: data.descricao,
        date: new Date().toISOString()
      }
    };
  }

  @Get('report')
  async getFinancialReport(@Request() req) {
    return {
      message: 'Financial Report - Access Granted',
      user: req.user.nome,
      report: {
        period: 'January 2024',
        income: 25000.00,
        expenses: 10000.00,
        profit: 15000.00,
        transactions: [
          { id: 1, description: 'Product A Sale', value: 5000.00, type: 'income' },
          { id: 2, description: 'Raw Material Purchase', value: 2000.00, type: 'expense' }
        ]
      }
    };
  }
} 