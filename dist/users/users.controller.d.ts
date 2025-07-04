import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    criarUsuario(req: any, body: any): Promise<{
        id: number;
        nome: string;
        email: string;
        senha: string;
        papel: string;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    criarAdministrador(req: any, body: any): Promise<{
        id: number;
        nome: string;
        email: string;
        senha: string;
        papel: string;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    criarUsuarioComum(req: any, body: any): Promise<{
        id: number;
        nome: string;
        email: string;
        senha: string;
        papel: string;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(req: any): Promise<Partial<{
        id: number;
        nome: string;
        email: string;
        senha: string;
        papel: string;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>[]>;
    findOne(id: string, req: any): Promise<Partial<{
        id: number;
        nome: string;
        email: string;
        senha: string;
        papel: string;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }> | null>;
    update(id: string, updateUserDto: UpdateUserDto, req: any): Promise<{
        id: number;
        nome: string;
        email: string;
        senha: string;
        papel: string;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string, req: any): Promise<{
        id: number;
        nome: string;
        email: string;
        senha: string;
        papel: string;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
