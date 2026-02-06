import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  /** Public for testing: list categories (no auth). */
  async getCategories() {
    return this.categoryRepo.find({ order: { id: 'ASC' } });
  }
}
