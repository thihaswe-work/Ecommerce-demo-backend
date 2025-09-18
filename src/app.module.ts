import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { Product } from './products/entities/product.entity';
import { User } from './users/entities/user.entity';
import { Order } from './orders/entities/order.entity';
import { OrderItem } from './orders/entities/order-item.entity';
import { PaymentMethod } from './payments/entities/payment.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: +(process.env.DB_PORT || 3306), //+ is a numary operator to change value from string to number like Number()
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'ecommerce',
      entities: [Product, User, Order, OrderItem, PaymentMethod],
      synchronize: true, // DEV only: auto-create tables. Disable in production.
      logging: false,
    }),
    ProductsModule,
    UsersModule,
    OrdersModule,
    PaymentsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
