export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal';
  cardLast4?: string;
  cardBrand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}
