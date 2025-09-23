// src/users/seeds/user.seed.ts
import { User } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';

export const seedUsers = async (dataSource: DataSource) => {
  const userRepo = dataSource.getRepository(User);

  // Create 5 users
  const users: User[] = [];
  for (let i = 1; i <= 5; i++) {
    const user = userRepo.create({
      name: `User ${i}`,
      email: `user${i}@example.com`,
      avatar: `https://i.pravatar.cc/150?img=${i}`, // optional avatar
    });

    await userRepo.save(user);
    users.push(user);
  }

  console.log('Users seeded successfully!');
  return users; // return created users for reference
};
