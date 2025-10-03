import * as common from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from 'src/entities/contact.entity';
import { Order } from 'src/entities/order.entity';
import { OrderItem } from 'src/entities/orderItem.entity';
import { PaymentMethod } from 'src/entities/payment-method.entity';
import { Address } from '../../entities/address.entity';
import { User } from '../../entities/user.entity';
import { MeController } from './me.controller';
import { MeMiddleware } from './me.middleware';
import { MeService } from './me.service';

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
