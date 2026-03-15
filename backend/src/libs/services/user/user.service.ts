import { EntityManager } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
import {
  GetAllUsersResponse,
  GetProfileImgDto,
  GetUserByIdDto,
  GetUserByIdResponse,
  UpdateUserImgDto,
} from '../../dto/user.dto';
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
      dto.timestamp ? `${dto.user_id}_${dto.timestamp}` : dto.user_id,
      StorageFolder.PROFILE,
    );
    if (!profileImg) {
      return { buffer: Buffer.from([]), type: '' };
    }

    return profileImg;
  }

  public async updateProfileImg(dto: UpdateUserImgDto) {
    const fileStorage = new FileStorage(this.configService);
    const filename = await fileStorage.saveFile(
      dto.file,
      dto.id,
      StorageFolder.PROFILE,
    );

    await this.manager.update(
      UserEntity,
      {
        _id: dto.id,
      },
      { profile_img: filename?.split('_')[1].split('.')[0] },
    );
  }

  public async getUserById(
    dto: GetUserByIdDto,
  ): Promise<GetUserByIdResponse | null> {
    const user = await this.manager.findOne(UserEntity, {
      where: { _id: dto.id },
    });

    return user
      ? {
          id: user._id,
          name: user.name,
          age: user.age,
          email: user.email,
          profile_img: user.profile_img,
        }
      : null;
  }
}
