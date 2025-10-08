import { Address } from 'src/entities/address.entity';
import { PaymentMethod } from 'src/entities/payment-method.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  firstName: string;

  @Column({ length: 255 })
  lastName: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @Column({ length: 1024, nullable: true })
  avatar?: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  // One user can have many addresses
  @OneToMany(() => Address, (address) => address.user, { cascade: true })
  address: Address[];

  @OneToMany(() => PaymentMethod, (paymentMethod) => paymentMethod.user, {
    cascade: true,
  })
  paymentMethod: PaymentMethod[];
}
