import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AppDataSource } from "src/data-source";
import { AddressModule } from "../addresses/addresses.module";
import { AuthModule } from "../auth/auth.module";
import { OrdersModule } from "../orders/orders.module";
import { PaymentsModule } from "../payments/payments.module";
import { ProductsModule } from "../products/products.module";
import { UsersModule } from "../users/users.module";
import { SeederModule } from "src/seeder/seeder.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    ProductsModule,
    UsersModule,
    OrdersModule,
    AuthModule,
    SeederModule,
    PaymentsModule,
    AddressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
