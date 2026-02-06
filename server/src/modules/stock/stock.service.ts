import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from '@entities/stock.entity';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private readonly repo: Repository<Stock>,
  ) {}

  create(dto: CreateStockDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const entity = this.repo.create(dto as any);
    return this.repo.save(entity);
  }

  findAll() {
    return this.repo.find({
      order: { id: 'ASC' },
      relations: ['product', 'item'],
    });
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({
      where: { id },
      relations: ['product', 'item'],
    });
    if (!entity) throw new NotFoundException('Stock #' + id + ' not found');
    return entity;
  }

  async update(id: number, dto: UpdateStockDto) {
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
