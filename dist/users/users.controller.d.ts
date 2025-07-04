import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(req: any, body: any): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createAdmin(req: any, body: any): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createRegularUser(req: any, body: any): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(req: any): Promise<Partial<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>[]>;
    findOne(id: string, req: any): Promise<Partial<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }> | null>;
    update(id: string, updateUserDto: UpdateUserDto, req: any): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string, req: any): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
