import { Injectable } from "@nestjs/common";
import { CreateGameDto } from "./dto/create-game.dto";
import { UpdateGameDto } from "./dto/update-game.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class GamesService {
  constructor(private prisma: PrismaService) {}

  create(createGameDto: CreateGameDto) {
    // TODO: Implement when game model is added to schema
    // Transformando a string (yyyy-mm-dd) de data em objeto Date
    // createGameDto.releaseDate = new Date(createGameDto.releaseDate);
    // return this.prisma.game.create({ data: createGameDto });
    return { message: 'Game creation not implemented yet' };
  }

  // SERA PAGINADO
  findAll() {
    // return this.prisma.game.findMany();
    return { message: 'Game listing not implemented yet' };
  }

  findOne(id: number) {
    return `This action returns a #${id} game`;
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }
}
