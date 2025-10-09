import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { MeService } from './me.service';
import { AuthGuard } from '@/common/auth.guard';
import { OwnershipGuardFactory } from '@/common/ownership.guard';
import { User } from '@/entities/user.entity';

@Controller('me')
@UseGuards(AuthGuard, OwnershipGuardFactory(User))
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Get()
  async profile(@Req() req: any, @Res() res: Response) {
    const { user } = req;
    const data = await this.meService.profile(user.id);
    res.status(200).json(data);
  }
}
