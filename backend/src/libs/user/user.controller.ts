import { Controller, Get } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly manager: EntityManager) {}

  @Get('')
  async getAllUsers() {
    return await this.manager.find(UserEntity, {
      select: { id: true, login: true },
    });
  }
}
