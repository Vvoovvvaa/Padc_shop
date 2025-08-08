import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from '@nestjs/jwt';

import { AuthModule } from './resource/auth/auth.module';
import { ProductModule} from './resource/products/products.module';
import { Products} from './resource/entyties/product_entyties';
import { User } from './resource/entyties/user_entyties';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './resource/category/category.module';
import { Category } from './resource/entyties/category_entyties';
import { OrdersModule } from './resource/orders/orders.module';
import { Orders } from './resource/entyties/order';

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
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5555,
      username: 'Vova',
      password: 'XoziMSovSHaurma',
      database: 'PADC_SHOP_DB',
      entities: [User, Products,Category,Orders],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
