import {
  Controller,
  Post,
  Put,
  Body,
  Param,
  Req,
  Get,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import type { Request, Response, NextFunction } from 'express';
import { AuthGuard } from 'src/common/auth.guard';
import { RolesGuard } from '@/common/roles.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @UseGuards(RolesGuard, AuthGuard)
  getAll(@Req() req: Request) {
    return this.ordersService.findAll();
  }
  @Get(':id')
  @UseGuards(RolesGuard, AuthGuard)
  getById(@Param('id') id: string) {
    return this.ordersService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Req() req: Request, @Body() body: any) {
    return this.ordersService.create(body);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(@Req() req: Request, @Param('id') id: string, @Body() body: any) {
    const updated = this.ordersService.update(id, body);
    return updated;
  }
}
