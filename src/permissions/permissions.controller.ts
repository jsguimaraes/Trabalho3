import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('permissions')
@UseGuards(JwtAuthGuard)
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post('grant')
  async grantPermission(
    @Body() body: any,
    @Request() req
  ) {
    return await this.permissionsService.grantPermission(
      body.userId,
      body.moduleId,
      req.user
    );
  }

  @Post('revoke')
  async revokePermission(
    @Body() body: any,
    @Request() req
  ) {
    return await this.permissionsService.revokePermission(
      body.userId,
      body.moduleId,
      req.user
    );
  }

  @Get('user/:id')
  async listUserPermissions(@Param('id') id: string) {
    return await this.permissionsService.listUserPermissions(parseInt(id));
  }

  @Get('modules')
  async listAllModules() {
    return await this.permissionsService.listAllModules();
  }

  @Get('users')
  async listUsersWithPermissions() {
    return await this.permissionsService.listUsersWithPermissions();
  }
} 