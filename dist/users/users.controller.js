"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const update_user_dto_1 = require("./dto/update-user.dto");
const jwt_guard_1 = require("../auth/jwt.guard");
const permission_guard_1 = require("../guards/permission.guard");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    async createUser(req, body) {
        const solicitante = req.user;
        if (body.role === 'admin' && solicitante.role !== 'superuser') {
            throw new common_1.ForbiddenException('Apenas superusuário pode criar administradores.');
        }
        if (body.role === 'user' && !['superuser', 'admin'].includes(solicitante.role)) {
            throw new common_1.ForbiddenException('Apenas superusuário e administradores podem criar usuários.');
        }
        return this.usersService.createUser(body);
    }
    async createAdmin(req, body) {
        const solicitante = req.user;
        if (solicitante.role !== 'superuser') {
            throw new common_1.ForbiddenException('Apenas superusuário pode criar administradores.');
        }
        return this.usersService.createAdmin(body);
    }
    async createRegularUser(req, body) {
        const solicitante = req.user;
        if (!['superuser', 'admin'].includes(solicitante.role)) {
            throw new common_1.ForbiddenException('Apenas superusuário e administradores podem criar usuários.');
        }
        return this.usersService.createRegularUser(body);
    }
    async findAll(req) {
        const solicitante = req.user;
        if (!['superuser', 'admin'].includes(solicitante.role)) {
            throw new common_1.ForbiddenException('Apenas superusuário e administradores podem listar usuários.');
        }
        return this.usersService.findAll();
    }
    async findOne(id, req) {
        const solicitante = req.user;
        const usuarioId = parseInt(id);
        if (solicitante.id === usuarioId) {
            return this.usersService.findOne(usuarioId);
        }
        if (!['superuser', 'admin'].includes(solicitante.role)) {
            throw new common_1.ForbiddenException('Apenas superusuário e administradores podem visualizar outros usuários.');
        }
        return this.usersService.findOne(usuarioId);
    }
    async update(id, updateUserDto, req) {
        const solicitante = req.user;
        const usuarioId = parseInt(id);
        if (solicitante.id === usuarioId) {
            return this.usersService.update(usuarioId, updateUserDto);
        }
        if (!['superuser', 'admin'].includes(solicitante.role)) {
            throw new common_1.ForbiddenException('Apenas superusuário e administradores podem atualizar outros usuários.');
        }
        return this.usersService.update(usuarioId, updateUserDto);
    }
    async remove(id, req) {
        const solicitante = req.user;
        const usuarioId = parseInt(id);
        if (solicitante.id === usuarioId) {
            throw new common_1.ForbiddenException('Usuário não pode deletar a si mesmo.');
        }
        if (solicitante.role !== 'superuser') {
            throw new common_1.ForbiddenException('Apenas superusuário pode deletar usuários.');
        }
        return this.usersService.remove(usuarioId);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('admin'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createAdmin", null);
__decorate([
    (0, common_1.Post)('regular'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createRegularUser", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map