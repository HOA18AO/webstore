import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Vendor } from './vendor.entity';
import { PurchaseDetail } from './purchase-detail.entity';

@Entity('purchase')
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  code: string;

  @Column({ name: 'vendor_code', type: 'varchar' })
  vendorCode: string;

  @Column({ name: 'original_amount', type: 'float', default: 0 })
  originalAmount: number;

  @Column({ name: 'additional_fee', type: 'float', default: 0 })
  additionalFee: number;

  @Column({ type: 'float', default: 0 })
  tax: number;

  @Column({ name: 'final_amount', type: 'float' })
  finalAmount: number;

  @Column({ type: 'varchar', nullable: true }) // pending, processing, completed
  status: string | null;

  @Column({ type: 'varchar', nullable: true })
  description: string | null;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Vendor, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'vendor_code', referencedColumnName: 'code' })
  vendor: Vendor;

  @OneToMany(() => PurchaseDetail, (d) => d.purchase)
  purchaseDetails: PurchaseDetail[];
}
