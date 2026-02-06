import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('customer')
export class Customer {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', unique: true })
  code?: string;

  @Column({ type: 'varchar' })
  name?: string;

  @Column({ type: 'varchar', nullable: true })
  email?: string | null;

  @Column({ type: 'varchar', nullable: true })
  mobile?: string | null;

  @Column({ type: 'varchar', nullable: true }) // b2b, b2c, ...
  type?: string | null;
}
