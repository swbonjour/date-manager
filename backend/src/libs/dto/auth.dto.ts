import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AuthSignUpDto {
  @ApiProperty({ type: String })
  @IsString()
  name!: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  age!: number;

  @ApiProperty({ type: String })
  @IsString()
  email!: string;

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
  email!: string;

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
  isEmail?: boolean;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  isPassword?: boolean;
}

export class AuthTokenData {
  @ApiProperty({ type: String })
  _id!: string;

  @ApiProperty({ type: String })
  email!: string;
}
