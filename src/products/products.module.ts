import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ProductsController],
  providers: [PrismaService],
})
export class ProductsModule {} 