import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeModule } from '../me/me.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from '../../entities/user.entity';
import { AuthMiddleware } from '@/common/auth.middleware';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@/common/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User]), MeModule],
  controllers: [UsersController],
  providers: [
    UsersService,

    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Protect product routes (POST + PUT)
    consumer.apply(AuthMiddleware).forRoutes(UsersController);
  }
}
