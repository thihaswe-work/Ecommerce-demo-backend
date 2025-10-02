import { MeController } from './me.controller';
import { MeService } from './me.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as common from '@nestjs/common';
import { MeMiddleware } from './me.middleware';
import { Address } from '../../entities/address.entity';
import { Router } from 'express';
import { Contact } from 'src/entities/contact.entity';
import { OrderItem } from 'src/entities/order-item.entity';
import { Order } from 'src/entities/order.entity';
import { User } from '../../entities/user.entity';
import { PaymentMethod } from 'src/entities/payment.entity';

@common.Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Address,
      PaymentMethod,
      Order,
      OrderItem,
      Contact,
    ]),
  ],
  controllers: [MeController],
  providers: [MeService],
})
export class MeModule implements common.NestModule {
  configure(consumer: common.MiddlewareConsumer) {
    consumer
      .apply(MeMiddleware)
      .forRoutes(
        { path: 'me', method: common.RequestMethod.PUT },
        { path: 'me', method: common.RequestMethod.DELETE },
        { path: 'me/profile', method: common.RequestMethod.GET },
      ); // Only protect /users/me
  }
}
