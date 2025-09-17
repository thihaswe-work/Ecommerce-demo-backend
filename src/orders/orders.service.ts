const { v4: uuid } = require('uuid');
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private repo: Repository<Order>) {}

  async create(data: Partial<Order>): Promise<Order> {
    const order: Order = this.repo.create({
      ...data,
      id: uuid(), // generate id here
      createdAt: new Date(), // optional if entity already has default
      updatedAt: new Date(), // optional if entity already has default
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
