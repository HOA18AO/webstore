import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@modules/auth/auth.module';
import { CategoryModule } from '@modules/category/category.module';
import { CustomerModule } from '@modules/customer/customer.module';
import { ProductModule } from '@modules/product/product.module';
import { UserModule } from '@modules/user/user.module';
import { AppDataSource } from './database';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...AppDataSource.options,
      synchronize: process.env.NODE_ENV !== 'production',
      migrationsRun: true,
    }),
    AuthModule,
    CategoryModule,
    ProductModule,
    CustomerModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
