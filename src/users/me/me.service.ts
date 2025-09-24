import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MeService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  async islogin(token?: string): Promise<User | null> {
    // In real app, verify JWT. For now, we just check the token string
    if (!token || token !== 'myUserToken') {
      return null;
    }

    // Return a sample user, you can fetch actual user if you store userId in JWT
    const user = await this.repo.findOneBy({ email: 'user1@example.com' }); // example

    if (!user) {
      throw new UnauthorizedException('Not logged in');
    }
    return user;
  }

  login(email: string, password: string): { user: User; token: string } {
    const user = {
      id: '9aed99d1-a172-4e90-b807-eafe2c6fdc6e',
      name: 'User 1',
      password: 'password',
      email: 'user1@example.com',
      avatar: 'https://i.pravatar.cc/150?img=1',
      createdAt: new Date('2025-09-24T04:51:16.604Z'), // <-- Date object
    };

    // if (user.password !== password) {
    //   throw new UnauthorizedException('Wrong Credentials');
    // }

    const token = 'myUserToken';

    // TODO: generate JWT in real app

    return { user, token };
  }
}
