import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { OrderItem } from './order-item.entity';
import { Address } from 'src/users/entities/address.entity';
import { PaymentMethod } from 'src/users/entities/payment-method.entity';
import { Contact } from 'src/users/entities/contact.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId?: string;

  @OneToMany(() => OrderItem, (item) => item.order, {
    cascade: true,
    eager: true,
  })
  items: OrderItem[];

  @Column('float', { default: 0 })
  total: number;

  @Column({ type: 'varchar', length: 50, default: 'pending' })
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  // Relationship with Address
  @ManyToOne(() => Address, (address) => address.orders, {
    eager: true,
  })
  @JoinColumn({ name: 'shippingAddressId' })
  shippingAddress: Address;

  @Column()
  shippingAddressId: number;

  // Relationship with Address
  @ManyToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.orders, {
    eager: true,
  })
  @JoinColumn({ name: 'paymentMethodId' })
  paymentMethod: PaymentMethod;

  @Column()
  paymentMethodId: number;

  @OneToOne(() => Contact)
  @JoinColumn()
  contact: Contact;
}
