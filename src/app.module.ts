import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from '@nestjs/jwt';

import { AuthModule } from './resource/auth/auth-module';
import { ProductModule} from './resource/products/products.module';
import { Product} from './resource/entyties/product.entyti';
import { User } from './resource/entyties/user.entyti';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './resource/category/category.module';
import { Category } from './resource/entyties/category.entyti';
import { OrdersModule } from './resource/orders/orders.module';
import { Order } from './resource/entyties/order.entity';
import { SecretCode } from './resource/entyties/secret.entity';
import { OrderInfo } from './resource/entyties/order-info.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    AuthModule,
    ProductModule,
    CategoryModule,
    ProductModule,
    OrdersModule,

    ConfigModule.forRoot({
      isGlobal:true
    }),

    ServeStaticModule.forRoot({
          rootPath: join (__dirname,'..','uploads/'),
          serveRoot: '/public/',
        }),
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5555,
      username: 'Vova',
      password: 'XoziMSovSHaurma',
      database: 'PADC_SHOP_DB',
      entities: [User, Product,Category,Order,SecretCode,OrderInfo],
      synchronize: true,
    }),
    

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
