/*
  Warnings:

  - Added the required column `rota` to the `Acesso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Acesso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioId" INTEGER NOT NULL,
    "modulo" TEXT NOT NULL,
    "rota" TEXT NOT NULL,
    "permitido" BOOLEAN NOT NULL,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip" TEXT,
    "userAgent" TEXT,
    CONSTRAINT "Acesso_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Acesso" ("data", "id", "modulo", "permitido", "usuarioId", "rota") SELECT "data", "id", "modulo", "permitido", "usuarioId", "modulo" FROM "Acesso";
DROP TABLE "Acesso";
ALTER TABLE "new_Acesso" RENAME TO "Acesso";
CREATE TABLE "new_Modulo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Modulo" ("id", "nome") SELECT "id", "nome" FROM "Modulo";
DROP TABLE "Modulo";
ALTER TABLE "new_Modulo" RENAME TO "Modulo";
CREATE UNIQUE INDEX "Modulo_nome_key" ON "Modulo"("nome");
CREATE TABLE "new_Permissao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioId" INTEGER NOT NULL,
    "moduloId" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Permissao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Permissao_moduloId_fkey" FOREIGN KEY ("moduloId") REFERENCES "Modulo" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Permissao" ("id", "moduloId", "usuarioId") SELECT "id", "moduloId", "usuarioId" FROM "Permissao";
DROP TABLE "Permissao";
ALTER TABLE "new_Permissao" RENAME TO "Permissao";
CREATE UNIQUE INDEX "Permissao_usuarioId_moduloId_key" ON "Permissao"("usuarioId", "moduloId");
CREATE TABLE "new_Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "papel" TEXT NOT NULL,
    "avatar" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Usuario" ("email", "id", "nome", "papel", "senha", "createdAt", "updatedAt") SELECT "email", "id", "nome", "papel", "senha", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
