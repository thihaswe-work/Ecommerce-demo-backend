import { Address } from 'src/users/addresses/addresses.interface';
import { PaymentMethod } from 'src/users/payments/payments.interface';

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  productImage: string;
  price: number;
  order: Order;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddressId: number;
  paymentMethodId: number;
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
  createdAt: Date;
  updatedAt: Date;
}
