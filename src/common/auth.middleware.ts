import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // console.log(req.headers);
    const authHeader = req.headers['authorization'];
    const expected = `Bearer ${process.env.AUTH_TOKEN || 'mysecrettoken'}`;
    if (!authHeader || authHeader !== expected) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  }
}
