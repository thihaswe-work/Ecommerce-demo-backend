import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

@Module({
  imports: [],
  controllers: [AuthController], // ✅ AuthController goes here
  providers: [AuthService], // ✅ AuthService should be in providers
})
export class AuthModule {}
