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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createUser(data) {
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
    async findAll() {
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
    async findOne(id) {
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
    async findByEmail(email) {
        return await this.prisma.user.findFirst({
            where: { email },
        });
    }
    async update(id, data) {
        return await this.prisma.user.update({
            where: { id },
            data,
        });
    }
    async remove(id) {
        return await this.prisma.user.delete({
            where: { id },
        });
    }
    async findPermissions(userId) {
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
    async createAdmin(data) {
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
    async createRegularUser(data) {
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
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map