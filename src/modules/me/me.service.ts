import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { Address } from '../../entities/address.entity';
import { Order } from 'src/entities/order.entity';
import { OrderItem } from 'src/entities/order-item.entity';
import { PaymentMethod } from 'src/entities/payment-method.entity';

@Injectable()
export class MeService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    @InjectRepository(Address) private addressRepo: Repository<Address>,
    @InjectRepository(PaymentMethod)
    private paymentMethodRepo: Repository<PaymentMethod>,
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,
  ) {}

  async islogin(
    token?: string,
  ): Promise<{ user: User; newToken?: string } | null> {
    // In real app, verify JWT. For now, we just check the token string
    if (!token) throw new UnauthorizedException('Unauthorized');

    let payload: any;
    let newToken: string | undefined;

    try {
      payload = jwt.verify(token, process.env.JWT_USER_SECRET || 'user-secret');
    } catch (err: any) {
      if (err.name === 'TokenExpiredError') {
        payload = jwt.decode(token);

        if (!payload || typeof payload === 'string') {
          throw new UnauthorizedException('Unauthorized');
        }

        newToken = jwt.sign(
          { id: payload.id, email: payload.email },
          process.env.JWT_USER_SECRET || 'user-secret',
          { expiresIn: '7d' },
        );
      } else {
        throw new UnauthorizedException('Unauthorized');
      }
    }
    // Return a sample user, you can fetch actual user if you store userId in JWT
    const user = await this.repo.findOneBy({ email: payload.email }); // example

    if (!user) {
      throw new UnauthorizedException('Not logged in');
    }

    return { user, newToken };
  }

  async login(
    email: string,
    password: string,
    remember: boolean,
  ): Promise<{ user: User; token: string }> {
    const user = await this.repo.findOneBy({ email });

    if (!user) throw new Error('Email is Incorrect');
    if (user.password !== password) {
      throw new UnauthorizedException('Wrong Credentials');
    }

    // const token = 'myUserToken';
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_USER_SECRET || 'user-secret',
      { expiresIn: remember ? '30d' : '1d' },
    );

    return { user, token };
  }

  async profile(userId: string) {
    try {
      const address = await this.addressRepo.findBy({ userId });
      const paymentMethod = await this.paymentMethodRepo.findBy({ userId });
      const orders = await this.orderRepo.findBy({ userId });

      return { address, paymentMethod, orders };
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw new InternalServerErrorException('Failed to fetch user profile');
    }
  }
}
