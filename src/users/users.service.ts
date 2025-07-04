import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: {
    name: string;
    email: string;
    password: string;
    role: string;
  }): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role,
        avatar: null,
      },
    });
  }

  async findAll(): Promise<Partial<User>[]> {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: number): Promise<Partial<User> | null> {
    return await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: { email },
    });
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<User> {
    return await this.prisma.user.delete({
      where: { id },
    });
  }

  async findPermissions(userId: number) {
    return await this.prisma.permission.findMany({
      where: {
        userId,
        active: true
      },
      include: {
        module: true
      }
    });
  }

  async createAdmin(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: 'admin',
        avatar: null,
      },
    });
  }

  async createRegularUser(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: 'user',
        avatar: null,
      },
    });
  }
}
