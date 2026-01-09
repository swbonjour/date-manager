import { EntityManager } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
import { GetAllUsersResponse, GetProfileImgDto } from '../../dto/user.dto';
import { Injectable } from '@nestjs/common';
import { FileStorage, StorageFolder } from 'src/utils/storage';
import { ConfigService } from '@nestjs/config';
import { ConfigEnv } from 'src/config/conf-env';

@Injectable()
export class UserService {
  constructor(
    private readonly manager: EntityManager,
    private readonly configService: ConfigService<ConfigEnv>,
  ) {}

  public async getAllUsers() {
    const users = await this.manager.find(UserEntity, {
      select: { _id: true, name: true },
    });

    return users.map(
      (item) =>
        ({ _id: item._id, name: item.name }) satisfies GetAllUsersResponse,
    );
  }

  public async getProfileImg(dto: GetProfileImgDto) {
    const storage = new FileStorage(this.configService);
    const profileImg = await storage.getFile(
      dto.user_id,
      StorageFolder.PROFILE,
    );
    return Buffer.from(
      profileImg!.buffer.slice(
        profileImg!.byteOffset,
        profileImg!.byteLength + profileImg!.byteLength,
      ),
    );
  }
}
