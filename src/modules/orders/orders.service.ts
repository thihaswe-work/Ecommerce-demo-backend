const { v4: uuid } = require('uuid');
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { OrderItem } from 'src/entities/orderItem.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  private guestCounter = 0;
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

  async create(payload: Partial<Order>): Promise<Order> {
    const customerId = payload.customerId
      ? payload.customerId
      : `guest${this.guestCounter}`;
    if (!payload.customerId) this.guestCounter += 1;
    const order = this.repo.create({
      customerId: customerId,
      subtotal: payload.subtotal,
      shipping: payload.shipping,
      total: payload.total,
      status: 'pending',
      contact: payload.contact, // plain object works because cascade: true
      payment: payload.payment, // same here
      shippingAddress: payload.shippingAddress,
      // same here
      orderItems: payload.orderItems, // array of plain objects
    });

    return await this.repo.save(order);
  }

  async update(id: string, data: Partial<Order>): Promise<Order> {
    const existing = await this.repo.findOneBy({ id });
    if (!existing) throw new NotFoundException('Order not found');
    Object.assign(existing, data);
    return this.repo.save(existing);
  }

  async delete(id: string): Promise<{ message: string }> {
    const order = await this.repo.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    await this.repo.remove(order); // cascades to related entities
    return { message: `Order ${id} deleted successfully` };
  }
}
