// src/payments/seeds/payment-method.seed.ts
import { DataSource } from 'typeorm';
import { PaymentMethod } from '../entities/payment.entity';
import { User } from 'src/entities/user.entity';

export const seedPaymentMethods = async (
  dataSource: DataSource,
  users: User[],
) => {
  const paymentRepo = dataSource.getRepository(PaymentMethod);

  for (const user of users) {
    const numMethods = Math.floor(Math.random() * 2) + 1; // 1 or 2 payment methods
    const methods: PaymentMethod[] = [];

    for (let i = 1; i <= numMethods; i++) {
      const method = paymentRepo.create({
        // type: 'card',
        cardBrand: i === 1 ? 'Visa' : 'Mastercard',
        cardLast4: i === 1 ? '4242' : '5555',
        expiryMonth: 12,
        expiryYear: 2025 + i, // different expiry years
        isDefault: i === 1,
        user,
        userId: user.id,
      });
      methods.push(method);
    }

    await paymentRepo.save(methods);
  }

  console.log('Payment methods seeded successfully!');
};
