import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigEnv } from './conf-env';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { UserEntity } from 'src/libs/entities/user.entity';
import { TaskEntity } from 'src/libs/entities/task.entity';

@Injectable()
export class TypeormConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService<ConfigEnv, true>) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get('db_host'),
      port: this.configService.get('db_port'),
      username: this.configService.get('db_user'),
      password: this.configService.get('db_pass'),
      database: this.configService.get('db_name'),
      entities: [UserEntity, TaskEntity],
      synchronize: true,
      useUTC: true,
    };
  }
}
