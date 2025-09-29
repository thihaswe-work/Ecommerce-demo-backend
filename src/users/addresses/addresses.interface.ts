export interface Address {
  id: number;
  type: string; // "shipping" | "billing"
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  createdAt: Date;
  userId: string;
}
