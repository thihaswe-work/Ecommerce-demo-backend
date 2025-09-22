// src/data-source.ts
import { DataSource } from 'typeorm';
import { Product } from './products/entities/product.entity';
import { User } from './users/entities/user.entity';
import { Order } from './orders/entities/order.entity';
import { OrderItem } from './orders/entities/order-item.entity';
import { PaymentMethod } from './payments/entities/payment.entity';
import { seedProducts } from './seeder/products.seed';
import { seedOrders } from './seeder/orders.seed';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT || 3306), //+ is a numary operator to change value from string to number like Number()
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ecommerce',
  entities: [Product, User, Order, OrderItem, PaymentMethod],
  synchronize: true, // DEV only: auto-create tables. Disable in production.
  logging: false,
});

// AppDataSource.initialize()
//   .then(async () => {
//     console.log('Database connected');

//     // Drops the entire schema
//     await AppDataSource.dropDatabase();

//     // Recreates tables based on entities
//     await AppDataSource.synchronize();

//     const productCount = await AppDataSource.getRepository(Product).count();
//     if (productCount === 0) {
//       await seedProducts(AppDataSource);
//       console.log('Products seeded!');
//     } else {
//       console.log('Products already exist. Skipping seed.');
//     }

//     const orderCount = await AppDataSource.getRepository(Order).count();
//     if (orderCount === 0) {
//       await seedOrders(AppDataSource);
//       console.log('Orders seeded!');
//     } else {
//       console.log('Orders already exist. Skipping seed.');
//     }

//     console.log('Seeding finished!');
//     process.exit(0);
//   })
//   .catch((err) => console.error(err));
