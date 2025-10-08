import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Product } from '../../entities/product.entity';
import { ProductsService } from './products.service';
import { RolesGuard } from '@/common/roles.guard';
import { AuthGuard } from '@/common/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  GetAllProducts() {
    return this.productsService.findAll();
  }
  @Get(':id')
  GetOneProduct(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }

  @Post()
  @UseGuards(RolesGuard, AuthGuard)
  create(@Body() body: Partial<Product>) {
    return this.productsService.create(body);
  }

  @Put(':id')
  @UseGuards(RolesGuard, AuthGuard)
  update(@Param('id') id: number, @Body() body: Partial<Product>) {
    const updated = this.productsService.update(id, body);
    if (!updated) throw new Error('Product not found'); // or use HttpException
    return updated;
  }

  @Delete(':id')
  @UseGuards(RolesGuard, AuthGuard)
  delete(@Param('id') id: number) {
    const deleted = this.productsService.delete(id);
    return deleted;
  }
}
