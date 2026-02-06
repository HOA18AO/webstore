import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('inventory')
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'serial_code', type: 'varchar' })
  serialCode: string;

  @Column({ type: 'float' })
  cost: number;

  @Column({ type: 'int' }) // 1 or -1
  quantity: number;

  @Column({ type: 'varchar', nullable: true }) // pack, box, ...
  unit: string | null;

  @Column({ name: 'transaction_type', type: 'varchar' }) // IN, OUT
  transactionType: string;

  @Column({ type: 'varchar', nullable: true })
  description: string | null;
}
