// export interface PaymentMethod {
//   id: string;
//   type: 'card' | 'paypal';
//   cardLast4?: string;
//   cardBrand?: string;
//   expiryMonth?: number;
//   expiryYear?: number;
//   isDefault: boolean;
// }
export interface PaymentMethod {
  id: number;
  type: string; // e.g., "card", "paypal", etc.
  cardLast4?: string;
  cardBrand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
  createdAt: Date;
  userId: string; // if you want to reference the user's ID
}
