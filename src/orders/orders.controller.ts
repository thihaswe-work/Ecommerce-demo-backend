import { Controller, Post, Put, Body, Param, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './orders.interface';
import { AuthMiddleware } from '../common/auth.middleware';
import type { Request, Response, NextFunction } from 'express';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  private useAuth(req: Request, res: Response, next: NextFunction) {
    new AuthMiddleware().use(req, res, next);
  }

  @Post()
  create(@Req() req: Request, @Body() body: Partial<Order>) {
    return new Promise((resolve) => {
      this.useAuth(req, req.res, () => {
        resolve(this.ordersService.create(body));
      });
    });
  }

  @Put(':id')
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() body: Partial<Order>,
  ) {
    return new Promise((resolve, reject) => {
      this.useAuth(req, req.res, () => {
        const updated = this.ordersService.update(id, body);
        if (!updated) reject({ status: 404, message: 'Order not found' });
        resolve(updated);
      });
    });
  }
}
