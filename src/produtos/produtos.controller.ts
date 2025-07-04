import { Controller, Get, Post, Body, Put, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { PermissionGuard } from '../guards/permission.guard';

@Controller('produtos')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class ProdutosController {
  
  @Get()
  async getProdutos(@Request() req) {
    return {
      message: 'Módulo de Produtos - Acesso Concedido',
      usuario: req.user.nome,
      papel: req.user.papel,
      data: new Date().toISOString(),
      produtos: [
        { id: 1, nome: 'Produto A', preco: 100.00, estoque: 50, categoria: 'Eletrônicos' },
        { id: 2, nome: 'Produto B', preco: 200.00, estoque: 30, categoria: 'Informática' },
        { id: 3, nome: 'Produto C', preco: 150.00, estoque: 25, categoria: 'Acessórios' }
      ]
    };
  }

  @Post()
  async criarProduto(@Body() data: any, @Request() req) {
    return {
      message: 'Produto criado com sucesso',
      usuario: req.user.nome,
      produto: {
        id: Math.floor(Math.random() * 1000),
        nome: data.nome,
        preco: data.preco,
        estoque: data.estoque,
        categoria: data.categoria,
        dataCriacao: new Date().toISOString()
      }
    };
  }

  @Put(':id')
  async atualizarProduto(@Param('id') id: string, @Body() data: any, @Request() req) {
    return {
      message: 'Produto atualizado com sucesso',
      usuario: req.user.nome,
      produto: {
        id: parseInt(id),
        nome: data.nome,
        preco: data.preco,
        estoque: data.estoque,
        categoria: data.categoria,
        dataAtualizacao: new Date().toISOString()
      }
    };
  }

  @Delete(':id')
  async deletarProduto(@Param('id') id: string, @Request() req) {
    return {
      message: 'Produto deletado com sucesso',
      usuario: req.user.nome,
      produtoId: parseInt(id)
    };
  }

  @Get('categorias')
  async getCategorias(@Request() req) {
    return {
      message: 'Categorias de Produtos - Acesso Concedido',
      usuario: req.user.nome,
      categorias: [
        { id: 1, nome: 'Eletrônicos', quantidade: 15 },
        { id: 2, nome: 'Informática', quantidade: 25 },
        { id: 3, nome: 'Acessórios', quantidade: 30 }
      ]
    };
  }
} 