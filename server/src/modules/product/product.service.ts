import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '@entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) {}

  create(dto: CreateProductDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  findAll() {
    return this.repo.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Product #' + id + ' not found');
    return entity;
  }

  async update(id: number, dto: UpdateProductDto) {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
    return entity;
  }
}
