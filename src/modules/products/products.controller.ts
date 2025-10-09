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
import { Roles } from '@/common/roles.decorator';
import { Role } from '@/common/enum';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles(Role.Admin, Role.User)
  GetAllProducts() {
    return this.productsService.findAll();
  }
  @Get(':id')
  GetOneProduct(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  create(@Body() body: Partial<Product>) {
    return this.productsService.create(body);
  }

  @Put(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  update(@Param('id') id: number, @Body() body: Partial<Product>) {
    const updated = this.productsService.update(id, body);
    if (!updated) throw new Error('Product not found'); // or use HttpException
    return updated;
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  delete(@Param('id') id: number) {
    const deleted = this.productsService.delete(id);
    return deleted;
  }
}
