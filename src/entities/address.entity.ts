import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Order } from 'src/entities/order.entity';
import { User } from 'src/entities/user.entity';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  type: 'shipping' | 'billing';

  @Column({ length: 255 })
  firstName: string;

  @Column({ length: 255 })
  lastName: string;

  @Column({ length: 1024 })
  address: string;

  @Column({ length: 255 })
  city: string;

  @Column({ length: 255 })
  state: string;

  @Column({ length: 20 })
  postalCode: string;

  @Column({ length: 255 })
  country: string;

  @Column({ default: false })
  isDefault: boolean;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  // Relationship with orders
  @OneToMany(() => Order, (order) => order.shippingAddress)
  orders: Order[];

  // Relationship with User
  @ManyToOne(() => User, (user) => user.addresses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' }) // <-- create foreign key column
  user: User;

  @Column()
  userId: string; // now you can see userId in each address record
}
