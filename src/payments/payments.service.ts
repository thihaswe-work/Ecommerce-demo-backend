import { Injectable } from '@nestjs/common';
import { PaymentMethod } from './payments.interface';
const { v4: uuid } = require('uuid');

@Injectable()
export class PaymentsService {
  private methods: PaymentMethod[] = [];

  create(data: Partial<PaymentMethod>): PaymentMethod {
    const method: PaymentMethod = { id: uuid(), ...data } as PaymentMethod;
    this.methods.push(method);
    return method;
  }

  update(id: string, data: Partial<PaymentMethod>): PaymentMethod | null {
    const method = this.methods.find((m) => m.id === id);
    if (!method) return null;
    Object.assign(method, data);
    return method;
  }

  findAll(): PaymentMethod[] {
    return this.methods;
  }
}
