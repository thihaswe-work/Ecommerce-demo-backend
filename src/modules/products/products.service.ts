import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "../../entities/product.entity";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) {}

  async create(data: Partial<Product>): Promise<Product> {
    console.log(data);
    const product = this.repo.create(data);
    return this.repo.save(product);
  }

  async update(id: number, data: Partial<Product>): Promise<Product> {
    const existing = await this.repo.findOneBy({ id });
    if (!existing) throw new NotFoundException("Product not found");
    Object.assign(existing, data);
    return this.repo.save(existing);
  }
  async delete(id: number) {
    const existing = await this.repo.findOneBy({ id });
    if (!existing) {
      throw new NotFoundException("Product not found");
    }
    return this.repo.delete(id);
  }

  async findAll(): Promise<Product[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Product | null> {
    return this.repo.findOneBy({ id });
  }
}
