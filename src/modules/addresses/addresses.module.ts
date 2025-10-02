import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from '../../entities/address.entity';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';
import { MeMiddleware } from '../me/me.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  controllers: [AddressesController],
  providers: [AddressesService],
  exports: [TypeOrmModule, AddressesService],
})
export class AddressModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MeMiddleware).forRoutes('/addresses'); // Only protect /users/me
  }
}
