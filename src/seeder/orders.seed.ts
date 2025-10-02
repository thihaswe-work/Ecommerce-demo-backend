import { Product } from 'src/entities/product.entity';
import { Address } from 'src/entities/address.entity';
import { DataSource } from 'typeorm';
import { seedUsers } from './users.seed';
import { User } from 'src/entities/user.entity';
import { Contact } from 'src/entities/contact.entity';
import { Order } from 'src/entities/order.entity';
import { OrderItem } from 'src/entities/order-item.entity';
import { PaymentMethod } from 'src/entities/payment.entity';

export const seedOrders = async (dataSource: DataSource) => {
  const orderRepo = dataSource.getRepository(Order);
  const productRepo = dataSource.getRepository(Product);
  const addressRepo = dataSource.getRepository(Address);
  const paymentRepo = dataSource.getRepository(PaymentMethod);
  const userRepo = dataSource.getRepository(User);
  const contactRepo = dataSource.getRepository(Contact);
  const products = await productRepo.find();
  const users = await userRepo.find();

  for (let i = 1; i <= 15; i++) {
    const isGuest = Math.random() > 0.5;
    const user = isGuest
      ? null
      : users[Math.floor(Math.random() * users.length)];

    // get random address and payment method for the user
    let shippingAddressId: number | null = null;
    let paymentMethodId: number | null = null;

    if (user) {
      const addresses = await addressRepo.find({ where: { userId: user.id } });
      if (addresses.length)
        shippingAddressId =
          addresses[Math.floor(Math.random() * addresses.length)].id;

      const payments = await paymentRepo.find({ where: { userId: user.id } });
      if (payments.length)
        paymentMethodId =
          payments[Math.floor(Math.random() * payments.length)].id;
    }

    // Create the order
    const order = orderRepo.create({
      userId: user?.id ?? `guest_${i}`,
      subtotal: 0,
      paymentType: 'card',
      shipping: 0,
      total: 0,
      status: 'pending',
      shippingAddressId: shippingAddressId ?? 1,
      paymentMethodId: paymentMethodId ?? 1,
      items: [],
      contact: undefined,
    });

    // Create order items and add them to the order
    const itemsCount = Math.floor(Math.random() * 3) + 1;
    let subtotal = 0;
    let shipping = 0;

    for (let j = 0; j < itemsCount; j++) {
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 5) + 1;

      const orderItem = orderRepo.manager.create(OrderItem, {
        productId: product.id,
        productName: product.name,
        quantity,
        productImage: product.image,
        price: product.price,
      });

      subtotal += orderItem.price * orderItem.quantity;
      order.items.push(orderItem);
    }

    order.subtotal = subtotal;

    if (subtotal < 100) shipping = 50;

    order.total = shipping + subtotal;

    // Create contact and attach to order
    const contact = orderRepo.manager.create(Contact, {
      name: user?.name ?? `Guest ${i}`,
      phone: 1234567890,

      // need this line If i don't put cascade true at the end of relation in orderTable
      // order: order, // link contact to order
    });
    order.contact = contact;

    // Save everything at once
    await orderRepo.save(order);

    // If i don't put cascade true at the end of relation in orderTable order repo will not be saved
    // // Save everything at once
    // const savedOrder = await orderRepo.save(order);

    // // Save contact manually
    // contact.order = savedOrder;
    // await contactRepo.save(contact);
  }

  console.log('Orders seeded successfully!');
};
