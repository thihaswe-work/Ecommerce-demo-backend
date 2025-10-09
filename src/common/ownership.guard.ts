// // src/guards/ownership.guard.ts
// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   ForbiddenException,
// } from '@nestjs/common';
// import { OrdersService } from '../modules/orders/orders.service';
// import { Order } from '@/entities/order.entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

// @Injectable()
// export class OwnershipGuard implements CanActivate {
//   constructor(
//     @InjectRepository(Order) private readonly repo: Repository<Order>,
//   ) {}
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const user = request.user;
//     const orderId = request.params.id;

//     // Admin bypass
//     if (user.role === 'admin') return true;

//     // Check ownership for normal users
//     const order = await this.repo.findOneBy({ id: orderId });

//     if (!order) throw new ForbiddenException('Order not found');

//     if (order.customerId !== user.id)
//       throw new ForbiddenException('Not allowed');
//     return true;
//   }
// }

// src/guards/ownership.guard.ts
import { User } from '@/entities/user.entity';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  Type,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export const OwnershipGuardFactory = (entity: Type<any>) => {
  @Injectable()
  class GenericOwnershipGuard implements CanActivate {
    constructor(
      @InjectRepository(entity)
      public readonly repo: Repository<any>, // ✅ make public
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      const id = request.params.id;

      if (user.role === 'admin') return true;

      const record = await this.repo.findOne({ where: { id } });
      if (!record) throw new ForbiddenException('Resource not found');

      if (record instanceof User && record.id === user.id) return true;
      // check multiple possible ownership fields
      const ownerIds = ['userId', 'customerId', 'ownerId'];
      const isOwner = ownerIds.some((key) => record[key] === user.id);

      if (!isOwner) throw new ForbiddenException('Not allowed');

      return true;
    }
  }

  return GenericOwnershipGuard;
};
