import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config } from './config/conf-env';
import { EventsModule } from './gateways/events.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfig } from './config/conf-orm';
import { AuthModule } from './libs/services/auth/auth.module';
import { UserModule } from './libs/services/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './libs/guards/jwt-auth.guard';
import { TaskModule } from './libs/services/task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeormConfig }),
    EventsModule,
    AuthModule,
    UserModule,
    TaskModule,
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
