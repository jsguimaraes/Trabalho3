import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ProfileController],
  providers: [UsersService, PrismaService],
})
export class ProfileModule {} 