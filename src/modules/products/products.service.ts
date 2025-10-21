import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../entities/product.entity';

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

  async update(id: number, data: Partial<Product>): Promise<Product> {
    const existing = await this.repo.findOneBy({ id });
    if (!existing) throw new NotFoundException('Product not found');
    Object.assign(existing, data);
    return this.repo.save(existing);
  }

  async delete(id: number) {
    const existing = await this.repo.findOneBy({ id });
    if (!existing) {
      throw new NotFoundException('Product not found');
    }
    return this.repo.delete(id);
  }

  async findAll(
    page: number,
    limit: number,
    order: 'ASC' | 'DESC',
    query?: string,
    min?: number,
    max?: number,
    categories?: number[] | undefined, //
  ) {
    const qb = this.repo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.inventory', 'inventory')
      .leftJoinAndSelect('product.category', 'category') // join category relation
      .orderBy('product.name', order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC')
      .take(limit)
      .skip((page - 1) * limit);
    // Only active products
    qb.andWhere('product.status = :status', { status: true });

    if (query) {
      qb.andWhere('product.name LIKE :query', { query: `%${query}%` });
    }

    if (min !== undefined) {
      qb.andWhere('inventory.price >= :min', { min });
    }

    if (max !== undefined) {
      qb.andWhere('inventory.price <= :max', { max });
    }
    if (categories && categories.length > 0) {
      qb.andWhere('category.id IN (:...categories)', { categories });
    }

    const [data, total] = await qb.getManyAndCount();
    // Remove status from the returned objects
    const cleanedData = data.map(({ status, ...rest }) => rest);
    return {
      data: cleanedData,
      meta: {
        totalItems: total,
        itemCount: data.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }

  async findAdminAll() {
    return await this.repo.find();
  }

  async findOne(id: number): Promise<Product> {
    return await this.repo.findOne({
      where: { id },
      relations: ['inventory'], // make sure inventory is loaded
    });
  }
}
