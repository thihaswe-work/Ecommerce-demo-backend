import { Controller, Post, Put, Body, Param, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentMethod } from './payments.interface';
import { AuthMiddleware } from '../common/auth.middleware';
import type { Request, Response, NextFunction } from 'express';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  private useAuth(req: Request, res: Response, next: NextFunction) {
    new AuthMiddleware().use(req, res, next);
  }

  @Post()
  create(@Req() req: Request, @Body() body: Partial<PaymentMethod>) {
    return new Promise((resolve) => {
      this.useAuth(req, req.res, () => {
        resolve(this.paymentsService.create(body));
      });
    });
  }

  @Put(':id')
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() body: Partial<PaymentMethod>,
  ) {
    return new Promise((resolve, reject) => {
      this.useAuth(req, req.res, () => {
        const updated = this.paymentsService.update(id, body);
        if (!updated)
          reject({ status: 404, message: 'Payment method not found' });
        resolve(updated);
      });
    });
  }
}
