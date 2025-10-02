// seeder.service.ts
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Order } from '../entities/order.entity';
import { seedProducts } from './products.seed';
import { seedOrders } from './orders.seed';
import { User } from 'src/entities/user.entity';
import { seedUsers } from './users.seed';
import { seedAddresses } from './addresses.seed';
import { PaymentMethod } from 'src/entities/payment-method.entity';
import { seedPaymentMethods } from './payment.seed';
import { Address } from 'src/entities/address.entity';
@Injectable()
export class SeederService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async seedDatabase() {
    // DEV only: wipe everything
    await this.dataSource.dropDatabase();
    await this.dataSource.synchronize();

    const productRepo = this.dataSource.getRepository(Product);
    const userRepo = this.dataSource.getRepository(User);
    const addressRepo = this.dataSource.getRepository(Address);
    const paymentRepo = this.dataSource.getRepository(PaymentMethod);
    const orderRepo = this.dataSource.getRepository(Order);

    // Products
    if ((await productRepo.count()) === 0) {
      await seedProducts(this.dataSource);
    }

    // Users
    let users: User[];
    if ((await userRepo.count()) === 0) {
      users = await seedUsers(this.dataSource);
    } else {
      users = await userRepo.find();
    }

    // Addresses
    if ((await addressRepo.count()) === 0) {
      await seedAddresses(this.dataSource, users);
    }

    // Payments
    if ((await paymentRepo.count()) === 0) {
      await seedPaymentMethods(this.dataSource, users);
    }

    // Orders
    if ((await orderRepo.count()) === 0) {
      await seedOrders(this.dataSource);
    }

    console.log('✅ Database seeded successfully');
    return { message: 'Database seeded successfully' };
  }
}
