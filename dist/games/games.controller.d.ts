import { GamesService } from "./games.service";
import { CreateGameDto } from "./dto/create-game.dto";
import { UpdateGameDto } from "./dto/update-game.dto";
export declare class GamesController {
    private readonly gamesService;
    constructor(gamesService: GamesService);
    create(createGameDto: CreateGameDto): {
        message: string;
    };
    findAll(): {
        message: string;
    };
    findOne(id: string): string;
    update(id: string, updateGameDto: UpdateGameDto): string;
    remove(id: string): string;
}
