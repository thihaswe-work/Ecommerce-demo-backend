import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("payments")
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;

  @Column()
  cardName: string;

  @Column()
  holderName: string;

  @Column({ type: "float" })
  amount: number;

  @Column()
  paymentType: "card" | "paypal" | "onDelivery";
}
