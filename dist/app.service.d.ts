import { PrismaService } from './prisma.service';
export declare class AppService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getHello(): string;
    onModuleInit(): Promise<void>;
    private inicializarSistema;
    private criarSuperusuario;
    private criarModulosFixos;
}
