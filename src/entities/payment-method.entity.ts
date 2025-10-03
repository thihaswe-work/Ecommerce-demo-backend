import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { User } from "./user.entity";

@Entity("payment_methods")
export class PaymentMethod {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column({ length: 50 })
  // paymentType: 'card' | 'paypal'; // e.g., "card", "paypal", etc.

  @Column({ length: 50, nullable: true })
  cardName: string;

  @Column({ length: 50, nullable: true })
  number: string; // keep it string

  @Column({ length: 5, nullable: true })
  numberLast4: string;

  @Column({ type: "int", nullable: true })
  expiryMonth?: number;

  @Column({ type: "int", nullable: true })
  expiryYear?: number;

  @Column({ length: 50, nullable: true })
  holderName: string;

  @Column({ default: false })
  isDefault: boolean;

  @CreateDateColumn({ type: "datetime" })
  createdAt: Date;

  @UpdateDateColumn({ type: "datetime" })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.paymentMethod, { onDelete: "CASCADE" })
  @JoinColumn() // <-- explicitly create the column
  user: User;
}
