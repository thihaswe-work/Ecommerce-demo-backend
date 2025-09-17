import { Controller, Post, Put, Body, Param, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.interface';
import { AuthMiddleware } from '../common/auth.middleware';
import type { Request, Response, NextFunction } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  private useAuth(req: Request, res: Response, next: NextFunction) {
    new AuthMiddleware().use(req, res, next);
  }

  @Post()
  create(@Req() req: Request, @Body() body: Partial<User>) {
    return new Promise((resolve) => {
      this.useAuth(req, req.res, () => {
        resolve(this.usersService.create(body));
      });
    });
  }

  @Put(':id')
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() body: Partial<User>,
  ) {
    return new Promise((resolve, reject) => {
      this.useAuth(req, req.res, () => {
        const updated = this.usersService.update(id, body);
        if (!updated) reject({ status: 404, message: 'User not found' });
        resolve(updated);
      });
    });
  }
}
