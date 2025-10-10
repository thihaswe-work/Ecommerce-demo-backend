import { AuthMiddleware } from '@/common/auth.middleware';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { OrderItem } from 'src/entities/orderItem.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OwnershipGuardFactory } from '@/common/ownership.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem])],
  providers: [OrdersService, OwnershipGuardFactory(Order)],
  controllers: [OrdersController],
  exports: [TypeOrmModule],
})
export class OrdersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/orders', method: RequestMethod.GET },
        { path: '/orders', method: RequestMethod.DELETE },
        { path: '/orders', method: RequestMethod.PUT },
      );
  }
}
