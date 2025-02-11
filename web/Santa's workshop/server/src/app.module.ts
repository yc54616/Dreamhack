import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtExpireMiddleware, LoggerMiddleware } from './common/middlewares';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './api/user/user.module';
import { AdminModule } from './api/admin/admin.module';

ConfigModule.forRoot();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '30m' },
    }),
    UserModule,
    AdminModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer.apply(JwtExpireMiddleware).exclude('/user/login').forRoutes('*');
  }
}
