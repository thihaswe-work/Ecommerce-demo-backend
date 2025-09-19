// src/data-source.ts
import { DataSource } from 'typeorm';
import { Product } from './products/entities/product.entity';
import { User } from './users/entities/user.entity';
import { Order } from './orders/entities/order.entity';
import { OrderItem } from './orders/entities/order-item.entity';
import { PaymentMethod } from './payments/entities/payment.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT || 3306), //+ is a numary operator to change value from string to number like Number()
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ecommerce',
  entities: [Product, User, Order, OrderItem, PaymentMethod],
  synchronize: false, // DEV only: auto-create tables. Disable in production.
  logging: false,
});
