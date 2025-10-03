import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // console.log('auth guard');
    const req = context.switchToHttp().getRequest<Request>();
    const authHeader = req.headers["authorization"];
    const expected = `Bearer ${process.env.AUTH_TOKEN || "mysecrettoken"}`;

    if (!authHeader || authHeader !== expected) {
      throw new UnauthorizedException("Unauthorized");
    }

    return true; // Authorized, allow the request to continue
  }
}
