import { IsString } from 'class-validator';

export class AuthSignUpDto {
  @IsString()
  login!: string;

  @IsString()
  password!: string;
}

export class AuthSignInDto {
  @IsString()
  login!: string;

  @IsString()
  password!: string;
}

export class AuthTokenData {
  id!: string;

  login!: string;
}
