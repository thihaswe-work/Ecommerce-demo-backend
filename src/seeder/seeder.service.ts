// seeder.service.ts
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { Order } from '../orders/entities/order.entity';
import { seedProducts } from './products.seed';
import { seedOrders } from './orders.seed';
import { User } from 'src/users/entities/user.entity';
import { seedUsers } from './users.seed';
import { seedAddresses } from './addresses.seed';
import { PaymentMethod } from 'src/users/entities/payment-method.entity';
import { seedPaymentMethods } from './payment.seed';

@Injectable()
export class SeederService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async seedDatabase() {
    // Use the injected dataSource; no need to initialize or new DataSource()
    await this.dataSource.dropDatabase(); // DEV only
    await this.dataSource.synchronize();

    const productCount = await this.dataSource.getRepository(Product).count();
    if (productCount === 0) await seedProducts(this.dataSource);

    const orderCount = await this.dataSource.getRepository(Order).count();
    if (orderCount === 0) await seedOrders(this.dataSource);

    const userCount = await this.dataSource.getRepository(User).count();
    let users: User[] = [];
    if (userCount === 0) {
      users = await seedUsers(this.dataSource);
    } else {
      users = await this.dataSource.getRepository(User).find();
    }

    // Seed addresses after users
    const addressCount = await this.dataSource.getRepository('Address').count();
    if (addressCount === 0) {
      await seedAddresses(this.dataSource, users);
    }

    const paymentCount = await this.dataSource
      .getRepository(PaymentMethod)
      .count();
    if (paymentCount === 0) {
      await seedPaymentMethods(this.dataSource, users);
    }
    console.log('database seeded');
    return { message: 'Database seeded successfully' };
  }
}
