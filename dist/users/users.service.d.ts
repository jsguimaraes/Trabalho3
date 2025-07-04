import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): import("generated/prisma").Prisma.Prisma__UserClient<{
        id: number;
        email: string;
        name: string | null;
        password: string;
        avatarUrl: string | null;
        role: string;
        createdAt: Date;
        updatedAt: Date | null;
    }, never, import("generated/prisma/runtime/library").DefaultArgs>;
    findAll(): import("generated/prisma").Prisma.PrismaPromise<{
        email: string;
        name: string | null;
        id: number;
    }[]>;
    findOne(id: number): import("generated/prisma").Prisma.Prisma__UserClient<{
        email: string;
        name: string | null;
        id: number;
        role: string;
    } | null, null, import("generated/prisma/runtime/library").DefaultArgs>;
    findByEmail(email: string): import("generated/prisma").Prisma.Prisma__UserClient<{
        id: number;
        email: string;
        name: string | null;
        password: string;
        avatarUrl: string | null;
        role: string;
        createdAt: Date;
        updatedAt: Date | null;
    } | null, null, import("generated/prisma/runtime/library").DefaultArgs>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
    criarUsuario(data: {
        nome: string;
        email: string;
        senha: string;
        papel: string;
    }): Promise<any>;
}
