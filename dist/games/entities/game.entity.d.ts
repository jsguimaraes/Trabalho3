export declare class Game {
    id: number;
    title: string;
    description: string;
    releaseDate: Date;
    coverUrl: string;
    publisher: string;
    developer: string;
    createdAt: Date;
    updatedAt: Date;
    constructor(id: number, title: string, description: string, coverUrl: string, publisher: string, developer: string, releaseDate: Date, createdAt?: Date, updatedAt?: Date);
}
