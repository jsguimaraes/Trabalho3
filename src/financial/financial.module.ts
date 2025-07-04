import { Module } from '@nestjs/common';
import { FinancialController } from './financial.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [FinancialController],
  providers: [PrismaService],
})
export class FinancialModule {} 