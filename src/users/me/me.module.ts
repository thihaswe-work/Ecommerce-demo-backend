import { MeController } from './me.controller';
import { MeService } from './me.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MeMiddleware } from './me.middleware';
import { Address } from '../entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Address])],
  controllers: [MeController],
  providers: [MeService],
})
export class MeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(MeMiddleware).forRoutes('me'); // Only protect /users/me
  }
}
