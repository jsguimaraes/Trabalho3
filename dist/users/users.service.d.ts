import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createUser(data: {
        name: string;
        email: string;
        password: string;
        role: string;
    }): Promise<User>;
    findAll(): Promise<Partial<User>[]>;
    findOne(id: number): Promise<Partial<User> | null>;
    findByEmail(email: string): Promise<User | null>;
    update(id: number, data: Partial<User>): Promise<User>;
    remove(id: number): Promise<User>;
    findPermissions(userId: number): Promise<({
        module: {
            id: number;
            name: string;
            description: string | null;
            active: boolean;
        };
    } & {
        id: number;
        userId: number;
        moduleId: number;
        active: boolean;
        createdAt: Date;
    })[]>;
    createAdmin(data: {
        name: string;
        email: string;
        password: string;
    }): Promise<User>;
    createRegularUser(data: {
        name: string;
        email: string;
        password: string;
    }): Promise<User>;
}
