import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { PermissionGuard } from '../guards/permission.guard';

@Controller('reports')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class ReportsController {
  
  @Get()
  async getReports(@Request() req) {
    return {
      message: 'Reports Module - Access Granted',
      user: req.user.nome,
      role: req.user.papel,
      date: new Date().toISOString(),
      reports: [
        { id: 1, name: 'Sales Report', type: 'sales', status: 'available' },
        { id: 2, name: 'Inventory Report', type: 'inventory', status: 'available' },
        { id: 3, name: 'Financial Report', type: 'financial', status: 'available' }
      ]
    };
  }

  @Post('generate')
  async generateReport(@Body() data: any, @Request() req) {
    return {
      message: 'Report generated successfully',
      user: req.user.nome,
      report: {
        id: Math.floor(Math.random() * 1000),
        type: data.tipo,
        period: data.periodo,
        generationDate: new Date().toISOString(),
        status: 'completed',
        url: `/reports/${Math.floor(Math.random() * 1000)}.pdf`
      }
    };
  }

  @Get('sales')
  async getSalesReport(@Request() req) {
    return {
      message: 'Sales Report - Access Granted',
      user: req.user.nome,
      report: {
        period: 'January 2024',
        totalSales: 50000.00,
        salesQuantity: 150,
        topProducts: [
          { name: 'Product A', quantity: 50, value: 15000.00 },
          { name: 'Product B', quantity: 30, value: 12000.00 }
        ]
      }
    };
  }
} 