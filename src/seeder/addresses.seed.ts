// src/addresses/seeds/address.seed.ts
import { DataSource } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Address } from 'src/users/entities/address.entity';

export const seedAddresses = async (dataSource: DataSource, users: User[]) => {
  const addressRepo = dataSource.getRepository(Address);

  for (const user of users) {
    const numAddresses = Math.floor(Math.random() * 2) + 1; // 1 or 2 addresses
    const addresses: Address[] = [];

    for (let j = 1; j <= numAddresses; j++) {
      const address = addressRepo.create({
        type: j === 1 ? 'shipping' : 'billing',
        firstName: user.name.split(' ')[0],
        lastName: user.name.split(' ')[1],
        address: `${j * 100 + parseInt(user.id.slice(0, 2), 16)} Main St`,
        city: j === 1 ? 'New York' : 'Boston',
        state: j === 1 ? 'NY' : 'MA',
        postalCode: j === 1 ? '10001' : '02101',
        country: 'US',
        isDefault: j === 1,
        user,
        userId: user.id, // FK column
      });
      addresses.push(address);
    }

    await addressRepo.save(addresses);
  }

  console.log('Addresses seeded successfully!');
};
