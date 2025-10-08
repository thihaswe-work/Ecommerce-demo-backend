import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/entities/address.entity';
import { Order } from 'src/entities/order.entity';
import { PaymentMethod } from 'src/entities/payment-method.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MeService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    @InjectRepository(Address) private addressRepo: Repository<Address>,
    @InjectRepository(PaymentMethod)
    private paymentMethodRepo: Repository<PaymentMethod>,
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
  ) {}

  async profile(userId: string) {
    try {
      const addresses = await this.addressRepo.find({
        where: { user: { id: userId } }, // <-- relation query
      });
      const paymentMethods = await this.paymentMethodRepo.find({
        where: { user: { id: userId } },
      });
      const orders = await this.orderRepo.findBy({ customerId: userId });

      return { addresses, paymentMethods, orders };
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw new InternalServerErrorException('Failed to fetch user profile');
    }
  }
}
