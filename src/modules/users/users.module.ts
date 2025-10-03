import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MeModule } from "../me/me.module";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { User } from "../../entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User]), MeModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
