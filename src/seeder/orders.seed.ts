import { DataSource } from 'typeorm';
import { Order } from '../orders/entities/order.entity';
import { OrderItem } from '../orders/entities/order-item.entity';
import { Product } from '../products/entities/product.entity';

export const seedOrders = async (dataSource: DataSource) => {
  const orderRepo = dataSource.getRepository(Order);
  const orderItemRepo = dataSource.getRepository(OrderItem);
  const productRepo = dataSource.getRepository(Product);

  const products = await productRepo.find();

  // create 5 orders
  for (let i = 1; i <= 5; i++) {
    const userId = Math.random() > 0.5 ? `user-${i}` : `guest_${i}`;

    const order = orderRepo.create({
      userId,
      totalAmount: 0,
      status: 'pending',
      items: [],
    });

    await orderRepo.save(order);

    // add 1-3 items per order
    const itemsCount = Math.floor(Math.random() * 3) + 1;
    let total = 0;

    for (let j = 0; j < itemsCount; j++) {
      const product = products[Math.floor(Math.random() * products.length)];

      const quantity = Math.floor(Math.random() * 5) + 1;

      const orderItem = orderItemRepo.create({
        productId: product.id,
        productName: product.name,
        quantity,
        price: product.price,
        order: order,
      });

      total += orderItem.price * orderItem.quantity;

      await orderItemRepo.save(orderItem);
      order.items.push(orderItem);
    }

    order.totalAmount = total;
    await orderRepo.save(order);
  }

  console.log('Orders seeded successfully!');
};
