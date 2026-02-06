import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Item } from './item.entity';

@Entity('historical_price')
export class HistoricalPrice {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'item_code', type: 'varchar' })
  itemCode?: string;

  @Column({ name: 'channel', type: 'varchar' })
  channel!: string;

  @Column({ type: 'float' })
  price?: number;

  @Column({ type: 'float', default: 0 }) // percentage
  tax?: number;

  @Column({ name: 'additional_fee', type: 'float', default: 0 })
  additionalFee?: number;

  @Column({ name: 'final_price', type: 'float' })
  finalPrice?: number;

  @Column({ name: 'from', type: 'timestamp' })
  from?: Date;

  @Column({ name: 'to', type: 'timestamp' })
  to?: Date;

  @ManyToOne(() => Item, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'item_code', referencedColumnName: 'itemCode' })
  item?: Item;
}
