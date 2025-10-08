import { Controller, Get, Req, Res } from '@nestjs/common';
import type { Response } from 'express';
import { MeService } from './me.service';

@Controller('me')
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Get('profile')
  async profile(@Req() req: any, @Res() res: Response) {
    const { user } = req;
    const data = await this.meService.profile(user.id);
    res.status(200).json(data);
  }
}
