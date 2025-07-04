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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma.service");
const bcrypt = require("bcrypt");
let AppService = class AppService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    getHello() {
        return 'Sistema de Controle de Acesso - API Funcionando!';
    }
    async onModuleInit() {
        await this.inicializarSistema();
    }
    async inicializarSistema() {
        await this.criarSuperusuario();
        await this.criarModulosFixos();
    }
    async criarSuperusuario() {
        const superusuarioExistente = await this.prisma.usuario.findFirst({
            where: { papel: 'superusuario' }
        });
        if (!superusuarioExistente) {
            const senhaCriptografada = await bcrypt.hash('admin123', 10);
            await this.prisma.usuario.create({
                data: {
                    nome: 'Super Administrador',
                    email: 'admin@sistema.com',
                    senha: senhaCriptografada,
                    papel: 'superusuario',
                }
            });
            console.log('✅ Superusuário criado: admin@sistema.com / admin123');
        }
    }
    async criarModulosFixos() {
        const modulosFixos = [
            { nome: 'usuarios', descricao: 'Gestão de Usuários' },
            { nome: 'perfil', descricao: 'Módulo de Perfil' },
            { nome: 'financeiro', descricao: 'Módulo Financeiro' },
            { nome: 'relatorios', descricao: 'Módulo de Relatórios' },
            { nome: 'produtos', descricao: 'Módulo de Produtos' },
        ];
        for (const modulo of modulosFixos) {
            const moduloExistente = await this.prisma.modulo.findUnique({
                where: { nome: modulo.nome }
            });
            if (!moduloExistente) {
                await this.prisma.modulo.create({
                    data: modulo
                });
                console.log(`✅ Módulo criado: ${modulo.nome}`);
            }
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AppService);
//# sourceMappingURL=app.service.js.map