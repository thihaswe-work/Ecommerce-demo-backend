import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { AuthMiddleware } from '../../common/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/common/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Protect product routes (POST + PUT)
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'products', method: RequestMethod.POST },
        { path: 'products/:id', method: RequestMethod.PUT },
        { path: 'products/:id', method: RequestMethod.DELETE },
      );
    // consumer.apply(AuthMiddleware).forRoutes(ProductsController);
  }
}
