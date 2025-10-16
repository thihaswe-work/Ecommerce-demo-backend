// src/data-source.ts
import 'dotenv/config'; // <-- automatically loads .env
import { DataSource } from 'typeorm';
import { OrderItem } from './entities/orderItem.entity';
import { Order } from './entities/order.entity';
import { Product } from './entities/product.entity';
import { Address } from './entities/address.entity';
import { Contact } from './entities/contact.entity';
import { User } from './entities/user.entity';
import { PaymentMethod } from './entities/payment-method.entity';
import { Inventory } from './entities/inventory.entity';
import { Payment } from './entities/payment.entity';
import { ShippingAddress } from './entities/shipping-address.entity';
import { Category } from './entities/category.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT || 3306), //+ is a numary operator to change value from string to number like Number()
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ecommerce',
  entities: [
    Category,
    User,
    Address,
    PaymentMethod,
    Product,
    Inventory,
    Order,
    OrderItem,
    Contact,
    Payment,
    ShippingAddress,
  ],
  synchronize: true, // DEV only: auto-create tables. Disable in production.
  logging: false,
});
