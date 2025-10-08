const { v4: uuid } = require('uuid');
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from 'src/entities/order.entity';
import { OrderItem } from 'src/entities/orderItem.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly repo: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItem: Repository<OrderItem>,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.repo.find({
      relations: ['orderItems', 'payment', 'contact', 'shippingAddress'], // list the relations you want
    });
  }

  async findById(id: string): Promise<Order> {
    const order = await this.repo.findOne({
      where: { id },
      relations: ['orderItems'], // include OrderItems
    });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async create(data: Partial<Order>): Promise<Order> {
    const order: Order = this.repo.create({
      ...data,
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
}
