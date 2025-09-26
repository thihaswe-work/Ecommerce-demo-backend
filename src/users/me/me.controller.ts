import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { MeService } from './me.service';

@Controller('me')
export class MeController {
  constructor(private readonly meService: MeService) {}
  @Get()
  async islogin(@Req() req: Request, @Res() res: Response) {
    const rawCookie = req.headers.cookie;
    const token = rawCookie
      ?.split(';')
      .map((c) => c.trim())
      .find((c) => c.startsWith('token='))
      ?.split('=')[1];
    const { user, newToken } = await this.meService.islogin(token);

    if (newToken) {
      res.cookie('token', newToken, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
      });
    }

    if (!user) {
      return new NotFoundException('User Not Found');
    }

    const { password: _, ...safeUser } = user;

    return res
      .status(HttpStatus.OK)
      .json({ message: 'Logged in', user: safeUser });
  }

  @Post('login')
  async login(@Res() res: Response, @Body() body) {
    const { email, password, remember } = body;
    const { user, token } = await this.meService.login(
      email,
      password,
      remember,
    );

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: remember ? 7 * 24 * 60 * 60 * 1000 : undefined,
    });

    const { password: _, ...safeUser } = user;
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Logged in', user: safeUser });
  }

  @Get('logout')
  async logout(@Res() res: Response) {
    res.cookie('token', '', {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 0, // expires immediately
    });

    return res
      .status(HttpStatus.OK)
      .json({ message: 'Logged out successfully' });
  }
}
