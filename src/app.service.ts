import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Access Control System - API Running!';
  }

  async onModuleInit() {
    await this.initializeSystem();
  }

  private async initializeSystem() {
    // Create superuser if not exists
    await this.createSuperuser();
    // Create fixed modules if not exists
    await this.createFixedModules();
  }

  private async createSuperuser() {
    const superuserExists = await this.prisma.user.findFirst({
      where: { role: 'superuser' }
    });
    if (!superuserExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await this.prisma.user.create({
        data: {
          name: 'Super Admin',
          email: 'admin@sistema.com',
          password: hashedPassword,
          role: 'superuser',
        }
      });
      console.log('✅ Superuser created: admin@sistema.com / admin123');
    }
  }

  private async createFixedModules() {
    const fixedModules = [
      { name: 'users', description: 'User Management' },
      { name: 'profile', description: 'Profile Module' },
      { name: 'financial', description: 'Financial Module' },
      { name: 'reports', description: 'Reports Module' },
      { name: 'products', description: 'Products Module' },
    ];
    for (const module of fixedModules) {
      const moduleExists = await this.prisma.module.findUnique({
        where: { name: module.name }
      });
      if (!moduleExists) {
        await this.prisma.module.create({
          data: module
        });
        console.log(`✅ Module created: ${module.name}`);
      }
    }
  }
}
