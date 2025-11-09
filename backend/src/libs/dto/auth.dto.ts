import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AuthSignUpDto {
  @ApiProperty({ type: String })
  @IsString()
  login!: string;

  @ApiProperty({ type: String })
  @IsString()
  password!: string;
}

export class AuthSignUpResponse {
  @ApiProperty({ type: String })
  @IsString()
  authToken!: string;
}

export class AuthSignInDto {
  @ApiProperty({ type: String })
  @IsString()
  login!: string;

  @ApiProperty({ type: String })
  @IsString()
  password!: string;
}

export class AuthSignInResponse {
  @ApiProperty({ type: String })
  @IsString()
  authToken!: string;
}

export class AuthSignInBadRequestResponse {
  @ApiProperty({ type: String })
  message: string;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  isLogin?: boolean;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  isPassword?: boolean;
}

export class AuthTokenData {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String })
  login!: string;
}
