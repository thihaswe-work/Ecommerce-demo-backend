import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class MeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.cookie;

    if (!authHeader) throw new UnauthorizedException('No token provided');

    const token = authHeader.split(' ')[1];
    if (!token) throw new UnauthorizedException('Malformed token');

    try {
      const payload = jwt.verify(token, process.env.JWT_USER_SECRET!);
      (req as any).user = payload;
      next();
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
