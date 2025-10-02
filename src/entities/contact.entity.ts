import { Order } from 'src/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('contact')
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column()
  phone: number;

  @OneToOne(() => Order, (order) => order.contact)
  @JoinColumn({ name: 'order_id' }) // Contact owns the foreign key
  order: Order;
}
