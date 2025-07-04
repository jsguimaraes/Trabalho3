import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { PermissionsModule } from "./permissions/permissions.module";
import { FinancialModule } from "./financial/financial.module";
import { ReportsModule } from "./reports/reports.module";
import { ProductsModule } from "./products/products.module";
import { ProfileModule } from "./profile/profile.module";
import { PrismaService } from "./prisma.service";

@Module({
  imports: [
    UsersModule, 
    AuthModule, 
    PermissionsModule,
    FinancialModule,
    ReportsModule,
    ProductsModule,
    ProfileModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
