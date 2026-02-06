import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { InvoiceDetail } from './invoice-detail.entity';

@Entity('invoice')
export class Invoice {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar' })
  code?: string;

  @Column({ name: 'original_amount', type: 'float' })
  originalAmount?: number;

  @Column({ type: 'float' }) // amount
  tax?: number;

  @Column({ name: 'final_amount', type: 'float' })
  finalAmount?: number;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date;

  @Column({ type: 'varchar', nullable: true })
  description?: string | null;

  @OneToMany(() => InvoiceDetail, (d) => d.invoice)
  invoiceDetails?: InvoiceDetail[];
}
