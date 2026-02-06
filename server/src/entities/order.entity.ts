import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { Staff } from './staff.entity';
import { OrderDetail } from './order-detail.entity';

@Entity({ name: 'order' }) // reserved word in SQL
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  code: string;

  @Column({ name: 'customer_code', type: 'varchar' })
  customerCode: string;

  @Column({ name: 'staff_code', type: 'varchar' })
  staffCode: string;

  @Column({ name: 'original_amount', type: 'float', default: 0 })
  originalAmount: number;

  @Column({ type: 'float', default: 0 }) // percentage
  tax: number;

  @Column({ type: 'float', default: 0 }) // amount, <=0
  discount: number;

  @Column({ name: 'shipping_fee', type: 'float', default: 0 })
  shippingFee: number;

  @Column({ name: 'additional_fee', type: 'float', default: 0 })
  additionalFee: number;

  @Column({ name: 'final_amount', type: 'float' })
  finalAmount: number;

  @Column({ type: 'varchar', nullable: true }) // pending, processing, shipping, completed
  status: string | null;

  @Column({ name: 'invoice_status', type: 'varchar', nullable: true })
  invoiceStatus: string | null;

  @Column({ name: 'bank_transaction_id', type: 'varchar', nullable: true })
  bankTransactionId: string | null;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'varchar', nullable: true })
  description: string | null;

  @ManyToOne(() => Customer, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'customer_code', referencedColumnName: 'code' })
  customer: Customer;

  @ManyToOne(() => Staff, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'staff_code', referencedColumnName: 'code' })
  staff: Staff;

  @OneToMany(() => OrderDetail, (detail) => detail.order)
  orderDetails: OrderDetail[];
}
