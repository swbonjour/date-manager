import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import {
  AuthSignInDto,
  AuthSignInResponse,
  AuthSignUpDto,
  AuthSignUpResponse,
  AuthTokenData,
} from '../dto/auth.dto';
import { UserEntity } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly manager: EntityManager,
    private readonly jwtService: JwtService,
  ) {}

  public async signUp(dto: AuthSignUpDto): Promise<AuthSignUpResponse> {
    const existingUser = await this.manager.findOneBy(UserEntity, {
      login: dto.login,
    });

    if (existingUser) {
      throw new HttpException(
        'The user is already exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const passwordHash = await hash(dto.password, 10);

    const user = this.manager.create(UserEntity, {
      login: dto.login,
      password: passwordHash,
    });

    await this.manager.insert(UserEntity, user);

    const authToken = await this.jwtService.signAsync({
      id: user.id,
      login: user.login,
    });

    return { authToken };
  }

  public async signIn(dto: AuthSignInDto): Promise<AuthSignInResponse> {
    const user = await this.manager.findOne(UserEntity, {
      where: { login: dto.login },
    });

    if (!user) {
      throw new HttpException(
        { message: 'User is not found', isLogin: true },
        HttpStatus.BAD_REQUEST,
      );
    }

    const isPasswordCorrect = await compare(dto.password, user.password);

    if (!isPasswordCorrect) {
      throw new HttpException(
        { message: 'Password is incorrect', isPassword: true },
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload: AuthTokenData = { id: user.id, login: dto.login };

    const authToken = await this.jwtService.signAsync(payload);

    return { authToken };
  }
}
