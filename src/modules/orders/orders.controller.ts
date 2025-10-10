import { AuthGuard } from '@/common/auth.guard';
import { RolesGuard } from '@/common/roles.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { OrdersService } from './orders.service';
import { OwnershipGuardFactory } from '@/common/ownership.guard';
import { Order } from '@/entities/order.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  getAll(@Req() req: Request) {
    return this.ordersService.findAll();
  }
  @Get(':id')
  @UseGuards(AuthGuard, OwnershipGuardFactory(Order))
  getById(@Param('id') id: string) {
    return this.ordersService.findById(id);
  }

  @Post()
  create(@Req() req: Request, @Body() body: any) {
    return this.ordersService.create(body);
  }

  @Put(':id')
  @UseGuards(AuthGuard, OwnershipGuardFactory(Order))
  update(@Req() req: Request, @Param('id') id: string, @Body() body: any) {
    const updated = this.ordersService.update(id, body);
    return updated;
  }
}
