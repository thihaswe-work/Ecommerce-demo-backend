import {
  Controller,
  Post,
  Put,
  Body,
  Param,
  Req,
  Get,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AdminMiddleware } from '../../common/admin.middleware';
import type { Request, Response, NextFunction } from 'express';
import { Product } from '../../entities/product.entity';
import { AuthGuard } from 'src/common/auth.guard';
import { Roles } from 'src/common/roles.decorator';
import { Role } from 'src/common/enum';
import { RolesGuard } from 'src/common/roles.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // private useAuth(req: Request, res: Response, next: NextFunction) {
  //   new AuthMiddleware().use(req, res, next);
  // }

  @Get()
  @UseGuards(RolesGuard, AuthGuard)
  GetAllProducts() {
    return this.productsService.findAll();
  }
  @Get(':id')
  GetOneProduct(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body() body: Partial<Product>) {
    return this.productsService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: Partial<Product>) {
    const updated = this.productsService.update(id, body);
    if (!updated) throw new Error('Product not found'); // or use HttpException
    return updated;
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    const deleted = this.productsService.delete(id);
    return deleted;
  }

  // @Post()
  // create(@Req() req: Request, @Body() body: Partial<Product>) {
  //   return new Promise((resolve) => {
  //     this.useAuth(req, req.res, () => {
  //       resolve(this.productsService.create(body));
  //     });
  //   });
  // }

  // @Put(':id')
  // update(
  //   @Req() req: Request,
  //   @Param('id') id: string,
  //   @Body() body: Partial<Product>,
  // ) {
  //   return new Promise((resolve, reject) => {
  //     this.useAuth(req, req.res, () => {
  //       const updated = this.productsService.update(id, body);
  //       if (!updated) reject({ status: 404, message: 'Product not found' });
  //       resolve(updated);
  //     });
  //   });
  // }
}
