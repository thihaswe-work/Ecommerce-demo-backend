export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
}

export interface Address {
  id: string;
  street?: string;
  city: string;
  country: string;
}
