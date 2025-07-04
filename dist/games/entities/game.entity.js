"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
class Game {
    id;
    title;
    description;
    releaseDate;
    coverUrl;
    publisher;
    developer;
    createdAt;
    updatedAt;
    constructor(id, title, description, coverUrl, publisher, developer, releaseDate, createdAt, updatedAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.coverUrl = coverUrl;
        this.publisher = publisher;
        this.developer = developer;
        this.releaseDate = releaseDate;
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }
}
exports.Game = Game;
//# sourceMappingURL=game.entity.js.map