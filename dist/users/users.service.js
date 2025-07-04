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
    async criarUsuario(data) {
        const senhaCriptografada = await bcrypt.hash(data.senha, 10);
        return await this.prisma.usuario.create({
            data: {
                nome: data.nome,
                email: data.email,
                senha: senhaCriptografada,
                papel: data.papel,
            },
        });
    }
    async findAll() {
        return await this.prisma.usuario.findMany({
            select: {
                id: true,
                nome: true,
                email: true,
                papel: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
    async findOne(id) {
        return await this.prisma.usuario.findUnique({
            where: { id },
            select: {
                id: true,
                nome: true,
                email: true,
                papel: true,
                avatar: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
    async findByEmail(email) {
        return await this.prisma.usuario.findFirst({
            where: { email },
        });
    }
    async update(id, data) {
        return await this.prisma.usuario.update({
            where: { id },
            data,
        });
    }
    async remove(id) {
        return await this.prisma.usuario.delete({
            where: { id },
        });
    }
    async findPermissoes(usuarioId) {
        return await this.prisma.permissao.findMany({
            where: {
                usuarioId,
                ativo: true
            },
            include: {
                modulo: true
            }
        });
    }
    async criarAdministrador(data) {
        const senhaCriptografada = await bcrypt.hash(data.senha, 10);
        return await this.prisma.usuario.create({
            data: {
                nome: data.nome,
                email: data.email,
                senha: senhaCriptografada,
                papel: 'administrador',
            },
        });
    }
    async criarUsuarioComum(data) {
        const senhaCriptografada = await bcrypt.hash(data.senha, 10);
        return await this.prisma.usuario.create({
            data: {
                nome: data.nome,
                email: data.email,
                senha: senhaCriptografada,
                papel: 'usuario',
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