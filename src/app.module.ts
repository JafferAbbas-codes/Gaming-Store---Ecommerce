import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './logger.middleware';
import { CategoryModule } from './category/category.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot(
      'mongodb+srv://jaffer:MJ1FnDyK0QC1yTlY@nodeapi-al9by.mongodb.net/taskback?retryWrites=true&w=majority',
    ),
    AuthModule,
    CategoryModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        // { path: 'products/', method: RequestMethod.GET },
        // { path: 'products/', method: RequestMethod.POST },
        // { path: 'products/:id', method: RequestMethod.GET },
        { path: 'products/:id', method: RequestMethod.PUT },
        { path: 'products/:id', method: RequestMethod.DELETE }
      );
  }
}
