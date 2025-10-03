import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrdersService } from "./orders.service";
import { Order } from "src/entities/order.entity";
import { OrderItem } from "src/entities/orderItem.entity";
import { OrdersController } from "./orders.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem])],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
