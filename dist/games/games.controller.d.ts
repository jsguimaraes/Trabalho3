import { GamesService } from "./games.service";
import { CreateGameDto } from "./dto/create-game.dto";
import { UpdateGameDto } from "./dto/update-game.dto";
export declare class GamesController {
    private readonly gamesService;
    constructor(gamesService: GamesService);
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
    findOne(id: string): string;
    update(id: string, updateGameDto: UpdateGameDto): string;
    remove(id: string): string;
}
