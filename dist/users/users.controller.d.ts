import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    criarUsuario(req: any, body: any): Promise<any>;
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
    findOne(id: string): import("generated/prisma").Prisma.Prisma__UserClient<{
        email: string;
        name: string | null;
        id: number;
        role: string;
    } | null, null, import("generated/prisma/runtime/library").DefaultArgs>;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
