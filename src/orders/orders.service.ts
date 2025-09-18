const { v4: uuid } = require('uuid');
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly repo: Repository<Order>,
    @InjectRepository(Order) private readonly orderItem: Repository<OrderItem>,
  ) {}

  async create(data: Partial<Order>): Promise<Order> {
    const order: Order = this.repo.create({
      ...data,
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.repo.save(order);
  }

  async update(id: string, data: Partial<Order>): Promise<Order> {
    const existing = await this.repo.findOneBy({ id });
    if (!existing) throw new NotFoundException('Order not found');
    Object.assign(existing, data);
    return this.repo.save(existing);
  }

  async findAll(): Promise<Order[]> {
    return this.repo.find();
  }
}
