import { EntityManager } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
import { GetAllUsersResponse } from '../../dto/user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly manager: EntityManager) {}

  public async getAllUsers() {
    const users = await this.manager.find(UserEntity, {
      select: { _id: true, name: true },
    });

    return users.map(
      (item) =>
        ({ _id: item._id, name: item.name }) satisfies GetAllUsersResponse,
    );
  }
}
