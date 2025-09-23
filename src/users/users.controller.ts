import {
  Controller,
  Post,
  Put,
  Body,
  Param,
  Req,
  Res,
  Delete,
  Get,
} from '@nestjs/common';
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

  @Get()
  findAll(@Req() req: Request) {
    return new Promise((resolve, reject) => {
      this.useAuth(req, req.res, () => {
        const users = this.usersService.findAll();
        resolve(users);
      });
    });
  }

  @Post()
  create(@Req() req: Request, @Body() body: Partial<User>) {
    return this.usersService.create(body);
  }

  // custom middleware (users.middleware.ts)
  @Put('me')
  async updateCurrentUser(@Req() req: Request, @Body() body: Partial<User>) {
    const user = (req as any).user; // from middleware
    const updated = await this.usersService.update(user.id, body);
    if (!updated) throw { status: 404, message: 'User not found' };
    return updated;
  }

  @Put(':id')
  update(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
    @Body() body: Partial<User>,
  ) {
    return new Promise((resolve, reject) => {
      this.useAuth(req, res, () => {
        const updated = this.usersService.update(id, body);
        if (!updated) reject({ status: 404, message: 'User not found' });
        resolve(updated);
      });
    });
  }

  // Do not Delte it !!important to look back
  // @Put(':id')
  // update(
  //   @Req() req: Request,
  //   @Param('id') id: string,
  //   @Body() body: Partial<User>,
  // ) {
  //   return new Promise((resolve, reject) => {
  //     this.useAuth(req, req.res, () => {
  //       const updated = this.usersService.update(id, body);
  //       if (!updated) reject({ status: 404, message: 'User not found' });
  //       resolve(updated);
  //     });
  //   });
  // }

  @Delete(':id')
  delete(@Req() req: Request, @Param('id') id: string) {
    return new Promise((resolve, reject) => {
      this.useAuth(req, req.res, () => {
        const deleted = this.usersService.delete(id);
        if (!deleted) {
          reject({ status: 404, message: 'User not found' });
        } else {
          resolve({ status: 200, message: 'User deleted successfully' });
        }
      });
    });
  }
}
