import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AppDataSource } from './data-source';
import { ProductsModule } from './products/products.module';
import { SeederModule } from './seeder/seeder.module';
import { UsersModule } from './users/users/users.module';
import { PaymentsModule } from './users/payments/payments.module';
import { AddressModule } from './users/addresses/addresses.module';
import { OrdersModule } from './orders/orders.module';

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
