import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { AuthSignInDto, AuthSignUpDto } from '../dto/auth.dto';
import { UserEntity } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly manager: EntityManager,
    private readonly jwtService: JwtService,
  ) {}

  public async signUp(dto: AuthSignUpDto) {
    const user = this.manager.create(UserEntity, {
      login: dto.login,
      password: dto.password,
    });

    await this.manager.insert(UserEntity, user);

    return await this.jwtService.signAsync({ id: user.id, login: user.login });
  }

  public async signIn(dto: AuthSignInDto) {
    const user = await this.manager.findOne(UserEntity, {
      where: { login: dto.login, password: dto.password },
    });

    if (!user) {
      throw new Error('User is not found');
    }

    const payload = { id: user.id, login: dto.login };

    return await this.jwtService.signAsync(payload);
  }
}
