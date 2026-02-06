import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Entity('item')
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'item_code', type: 'varchar', unique: true })
  itemCode: string;

  @Column({ name: 'category_code', type: 'varchar' })
  categoryCode: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  code: string | null;

  @Column({ type: 'boolean', default: true })
  available: boolean;

  @Column({ type: 'varchar', nullable: true })
  description: string | null;

  @ManyToOne(() => Category, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'category_code', referencedColumnName: 'code' })
  category: Category;
}
