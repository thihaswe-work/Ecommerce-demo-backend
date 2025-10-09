import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { getToken } from './lib';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const bearer = req.headers['authorization'];
    const authHeader = bearer?.split(' ')[1] || getToken(req.headers.cookie);
    req.authToken = authHeader; // ✅ store safely
    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  }
}
