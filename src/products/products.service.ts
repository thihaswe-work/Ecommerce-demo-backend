import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) {}

  async create(data: Partial<Product>): Promise<Product> {
    const product = this.repo.create(data);
    return this.repo.save(product);
  }

  async update(id: string, data: Partial<Product>): Promise<Product> {
    const existing = await this.repo.findOneBy({ id });
    if (!existing) throw new NotFoundException('Product not found');
    Object.assign(existing, data);
    return this.repo.save(existing);
  }

  async findAll(): Promise<Product[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<Product | null> {
    return this.repo.findOneBy({ id });
  }
}
