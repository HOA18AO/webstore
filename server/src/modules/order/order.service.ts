import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '@entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly repo: Repository<Order>,
  ) {}

  create(dto: CreateOrderDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  findAll() {
    return this.repo.find({
      order: { id: 'ASC' },
      relations: ['customer', 'staff', 'orderDetails'],
    });
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({
      where: { id },
      relations: ['customer', 'staff', 'orderDetails'],
    });
    if (!entity) throw new NotFoundException('Order #' + id + ' not found');
    return entity;
  }

  async update(id: number, dto: UpdateOrderDto) {
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
