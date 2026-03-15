import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class GetAllUsersResponse {
  @ApiProperty({ type: String })
  @IsUUID()
  _id!: string;

  @ApiProperty({ type: String })
  @IsString()
  name!: string;
}

export class GetProfileImgDto {
  @ApiProperty({ type: String })
  @IsUUID()
  user_id: string;

  @ApiProperty({ type: String })
  @IsString()
  timestamp?: string;
}

export class GetProfileImgResponse {
  @ApiPropertyOptional({ type: String, format: 'binary' })
  @IsString()
  @IsOptional()
  img?: Buffer<ArrayBufferLike>;
}

export class GetUserByIdDto {
  @ApiProperty({ type: String })
  @IsUUID()
  id: string;
}

export class GetUserByIdResponse {
  @ApiProperty({ type: String })
  @IsUUID()
  id: string;

  @ApiProperty({ type: String })
  @IsString()
  name: string;

  @ApiProperty({ type: String })
  @IsString()
  age: string;

  @ApiProperty({ type: String })
  @IsString()
  email: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  profile_img?: string;
}

export class UpdateUserImgDto {
  @ApiProperty({ type: String })
  @IsUUID()
  id: string;

  file: Express.Multer.File;
}
