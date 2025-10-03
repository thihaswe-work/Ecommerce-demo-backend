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
import { AdminMiddleware } from '../../common/admin.middleware';
import type { Request, Response, NextFunction } from 'express';
import { User } from 'src/entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  private useAuth(req: Request, res: Response, next: NextFunction) {
    new AdminMiddleware().use(req, res, next);
  }

  @Get()
  findAll(@Req() req: Request) {
    return new Promise((resolve, reject) => {
      this.useAuth(req, req.res, async () => {
        const users = await this.usersService.findAll();
        resolve(users);
      });
    });
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

  // Do not Delete it !!important to look back
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
