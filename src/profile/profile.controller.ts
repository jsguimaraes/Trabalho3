import { Controller, Get, Put, Body, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { PermissionGuard } from '../guards/permission.guard';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Controller('profile')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class ProfileController {
  constructor(private readonly usersService: UsersService) {}
  
  @Get()
  async getProfile(@Request() req) {
    const user = await this.usersService.findOne(req.user.id);
    
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    return {
      message: 'Profile Module - Access Granted',
      user: req.user.name,
      role: req.user.role,
      date: new Date().toISOString(),
      profile: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        creationDate: user.createdAt,
        lastUpdate: user.updatedAt
      }
    };
  }

  @Put()
  async updateProfile(@Body() data: any, @Request() req) {
    const updateData: any = {};
    
    if (data.name) updateData.name = data.name;
    if (data.email) updateData.email = data.email;
    if (data.avatar) updateData.avatar = data.avatar;
    
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    const updatedUser = await this.usersService.update(req.user.id, updateData);

    return {
      message: 'Profile updated successfully',
      user: req.user.name,
      profile: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        avatar: updatedUser.avatar,
        updateDate: new Date().toISOString()
      }
    };
  }

  @Get('permissions')
  async getProfilePermissions(@Request() req) {
    // Get user permissions
    const permissions = await this.usersService.findPermissions(req.user.id);
    
    return {
      message: 'Profile Permissions - Access Granted',
      user: req.user.name,
      permissions: permissions
    };
  }
} 