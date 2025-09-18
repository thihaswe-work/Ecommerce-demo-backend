import { Injectable, UnauthorizedException } from '@nestjs/common';

export interface User {
  name: string;
  email: string;
}

@Injectable()
export class AuthService {
  private readonly validEmail = 'admin@passiongeek.com';
  private readonly validPassword = 'admin123';
  private readonly token = process.env.AUTH_TOKEN || 'mysecrettoken';

  login(email: string, password: string): { user: User; token: string } {
    if (email === this.validEmail && password === this.validPassword) {
      const user: User = { name: 'John Doe', email };
      return { user, token: this.token };
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  logout(): { message: string } {
    return { message: 'Logged out successfully' };
  }
}
