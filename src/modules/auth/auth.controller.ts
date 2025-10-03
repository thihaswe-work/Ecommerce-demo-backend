import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(
    @Body() body: { email: string; password: string },
    @Res() res: Response,
  ) {
    try {
      const { user, token } = this.authService.login(body.email, body.password);

      // Set HttpOnly cookie
      res.cookie('token', token, {
        // httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: 'lax',
      });

      return res.status(HttpStatus.OK).json({ message: 'Logged in', user });
    } catch (err: any) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: err.message });
    }
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('token');
    return res.status(HttpStatus.OK).json(this.authService.logout());
  }
}
