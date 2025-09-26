import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('payment_methods')
export class PaymentMethod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  type: string; // e.g., "card", "paypal", etc.

  @Column({ length: 20, nullable: true })
  cardLast4?: string;

  @Column({ length: 50, nullable: true })
  cardBrand?: string;

  @Column({ type: 'int', nullable: true })
  expiryMonth?: number;

  @Column({ type: 'int', nullable: true })
  expiryYear?: number;

  @Column({ default: false })
  isDefault: boolean;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.paymentMethods, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' }) // <-- explicitly create the column
  user: User;

  @Column()
  userId: string; // optional: mirrors the foreign key for easy access
}
