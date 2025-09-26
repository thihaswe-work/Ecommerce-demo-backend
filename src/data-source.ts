// src/data-source.ts
import 'dotenv/config'; // <-- automatically loads .env
import { DataSource } from 'typeorm';
import { OrderItem } from './orders/entities/order-item.entity';
import { Order } from './orders/entities/order.entity';
import { Product } from './products/entities/product.entity';
import { Address } from './users/entities/address.entity';
import { PaymentMethod } from './users/entities/payment-method.entity';
import { User } from './users/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT || 3306), //+ is a numary operator to change value from string to number like Number()
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ecommerce',
  entities: [Product, User, Order, OrderItem, Address, PaymentMethod],
  synchronize: true, // DEV only: auto-create tables. Disable in production.
  logging: false,
});
