import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Purchase } from './purchase.entity';
import { Product } from './product.entity';
import { PurchaseReceipt } from './purchase-receipt.entity';

@Entity('purchase_detail')
export class PurchaseDetail {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'purchase_id', type: 'int' })
  purchaseId?: number;

  @Column({ name: 'product_code', type: 'varchar' })
  productCode?: string;

  @Column({ name: 'unit_cost', type: 'float' })
  unitCost?: number;

  @Column({ type: 'int' })
  quantity?: number;

  @Column({ name: 'additional_fee', type: 'float', default: 0 })
  additionalFee?: number;

  @Column({ type: 'float', default: 0 })
  tax?: number;

  @Column({ name: 'total_cost', type: 'float' })
  totalCost?: number;

  @Column({ type: 'varchar', nullable: true })
  description?: string | null;

  @ManyToOne(() => Purchase, (p) => p.purchaseDetails, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'purchase_id' })
  purchase?: Purchase;

  @ManyToOne(() => Product, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'product_code', referencedColumnName: 'code' })
  product?: Product;

  @OneToMany(() => PurchaseReceipt, (r) => r.purchaseDetail)
  purchaseReceipts?: PurchaseReceipt[];
}
