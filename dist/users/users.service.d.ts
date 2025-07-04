import { PrismaService } from 'src/prisma.service';
import { Usuario } from '@prisma/client';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    criarUsuario(data: {
        nome: string;
        email: string;
        senha: string;
        papel: string;
    }): Promise<Usuario>;
    findAll(): Promise<Partial<Usuario>[]>;
    findOne(id: number): Promise<Partial<Usuario> | null>;
    findByEmail(email: string): Promise<Usuario | null>;
    update(id: number, data: Partial<Usuario>): Promise<Usuario>;
    remove(id: number): Promise<Usuario>;
    findPermissoes(usuarioId: number): Promise<any>;
    criarAdministrador(data: {
        nome: string;
        email: string;
        senha: string;
    }): Promise<Usuario>;
    criarUsuarioComum(data: {
        nome: string;
        email: string;
        senha: string;
    }): Promise<Usuario>;
}
