import { CreateGameDto } from "./dto/create-game.dto";
import { UpdateGameDto } from "./dto/update-game.dto";
import { PrismaService } from "src/prisma.service";
export declare class GamesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createGameDto: CreateGameDto): import("generated/prisma").Prisma.Prisma__GameClient<{
        id: number;
        title: string;
        genre: string;
        releaseDate: Date;
        description: string | null;
        coverUrl: string | null;
        publisher: string | null;
        developer: string | null;
        createdAt: Date;
        updatedAt: Date | null;
    }, never, import("generated/prisma/runtime/library").DefaultArgs>;
    findAll(): import("generated/prisma").Prisma.PrismaPromise<{
        id: number;
        title: string;
        genre: string;
        releaseDate: Date;
        description: string | null;
        coverUrl: string | null;
        publisher: string | null;
        developer: string | null;
        createdAt: Date;
        updatedAt: Date | null;
    }[]>;
    findOne(id: number): string;
    update(id: number, updateGameDto: UpdateGameDto): string;
    remove(id: number): string;
}
