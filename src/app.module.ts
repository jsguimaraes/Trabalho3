import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { PermissionsModule } from "./permissions/permissions.module";
import { FinanceiroModule } from "./financeiro/financeiro.module";
import { RelatoriosModule } from "./relatorios/relatorios.module";
import { ProdutosModule } from "./produtos/produtos.module";
import { PerfilModule } from "./perfil/perfil.module";
import { PrismaService } from "./prisma.service";

@Module({
  imports: [
    UsersModule, 
    AuthModule, 
    PermissionsModule,
    FinanceiroModule,
    RelatoriosModule,
    ProdutosModule,
    PerfilModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
