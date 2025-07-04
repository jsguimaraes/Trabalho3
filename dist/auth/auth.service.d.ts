import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    validateUser(email: string, senha: string): Promise<{
        id: number;
        nome: string;
        email: string;
        papel: string;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
