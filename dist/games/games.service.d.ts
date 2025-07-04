import { CreateGameDto } from "./dto/create-game.dto";
import { UpdateGameDto } from "./dto/update-game.dto";
import { PrismaService } from "src/prisma.service";
export declare class GamesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createGameDto: CreateGameDto): {
        message: string;
    };
    findAll(): {
        message: string;
    };
    findOne(id: number): string;
    update(id: number, updateGameDto: UpdateGameDto): string;
    remove(id: number): string;
}
