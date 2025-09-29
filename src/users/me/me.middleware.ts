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
    const adminHeader = req.headers['authorization'];

    if (!authHeader && !adminHeader)
      throw new UnauthorizedException('No token provided');

    let token;
    if (authHeader) {
      const rawCookie = req.headers.cookie;
      token = rawCookie
        ?.split(';')
        .map((c) => c.trim())
        .find((c) => c.startsWith('token='))
        ?.split('=')[1];
    }

    if (!token && !adminHeader)
      throw new UnauthorizedException('Malformed token');

    // if (token) {
    //   try {
    //     const payload = jwt.verify(token, process.env.JWT_USER_SECRET!);
    //     (req as any).user = payload;
    //     next();
    //   } catch {
    //     throw new UnauthorizedException('Invalid token');
    //   }
    // }

    next();
  }
}
