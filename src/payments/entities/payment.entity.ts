import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('payment_methods')
export class PaymentMethod {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 20 })
  type: 'card' | 'paypal';

  @Column({ length: 4, nullable: true })
  cardLast4?: string;

  @Column({ length: 50, nullable: true })
  cardBrand?: string;

  @Column('int', { nullable: true })
  expiryMonth?: number;

  @Column('int', { nullable: true })
  expiryYear?: number;

  @Column({ default: false })
  isDefault: boolean;
}
