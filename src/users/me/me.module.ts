import { MeController } from './me.controller';
import { MeService } from './me.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MeMiddleware } from './me.middleware';
import { Address } from '../entities/address.entity';
import { Router } from 'express';
import { PaymentMethod } from '../entities/payment-method.entity';
import { Order } from 'src/orders/entities/order.entity';
import { OrderItem } from 'src/orders/entities/order-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Address, PaymentMethod, Order, OrderItem]),
  ],
  controllers: [MeController],
  providers: [MeService],
})
export class MeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MeMiddleware)
      .forRoutes(
        { path: 'me', method: RequestMethod.PUT },
        { path: 'me', method: RequestMethod.DELETE },
        { path: 'me/profile', method: RequestMethod.GET },
      ); // Only protect /users/me
  }
}
