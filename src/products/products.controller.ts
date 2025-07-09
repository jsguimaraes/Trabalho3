import { Controller, Get, Post, Body, Put, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { PermissionGuard } from '../guards/permission.guard';

@Controller('products')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class ProductsController {
  
  @Get()
  async getProducts(@Request() req) {
    return {
      message: 'Products Module - Access Granted',
      user: req.user.nome,
      role: req.user.role,
      date: new Date().toISOString(),
      products: [
        { id: 1, name: 'Product A', price: 100.00, stock: 50, category: 'Electronics' },
        { id: 2, name: 'Product B', price: 200.00, stock: 30, category: 'Computers' },
        { id: 3, name: 'Product C', price: 150.00, stock: 25, category: 'Accessories' }
      ]
    };
  }

  @Post()
  async createProduct(@Body() data: any, @Request() req) {
    return {
      message: 'Product created successfully',
      user: req.user.nome,
      product: {
        id: Math.floor(Math.random() * 1000),
        name: data.nome,
        price: data.preco,
        stock: data.estoque,
        category: data.categoria,
        creationDate: new Date().toISOString()
      }
    };
  }

  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() data: any, @Request() req) {
    return {
      message: 'Product updated successfully',
      user: req.user.nome,
      product: {
        id: parseInt(id),
        name: data.nome,
        price: data.preco,
        stock: data.estoque,
        category: data.categoria,
        updateDate: new Date().toISOString()
      }
    };
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string, @Request() req) {
    return {
      message: 'Product deleted successfully',
      user: req.user.nome,
      productId: parseInt(id)
    };
  }

  @Get('categories')
  async getCategories(@Request() req) {
    return {
      message: 'Product Categories - Access Granted',
      user: req.user.nome,
      categories: [
        { id: 1, name: 'Electronics', quantity: 15 },
        { id: 2, name: 'Computers', quantity: 25 },
        { id: 3, name: 'Accessories', quantity: 30 }
      ]
    };
  }
} 