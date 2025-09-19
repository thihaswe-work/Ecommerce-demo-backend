import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  productId: string;

  @Column()
  productName: string;

  @Column()
  productImage: string;

  @Column('int')
  quantity: number;

  @Column('float')
  price: number;
}
