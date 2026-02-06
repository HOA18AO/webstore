import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('vendor')
export class Vendor {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', unique: true })
  code?: string;

  @Column({ type: 'varchar' })
  name?: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string | null;
}
