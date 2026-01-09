import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class GetAllUsersResponse {
  @ApiProperty({ type: String })
  @IsString()
  _id!: string;

  @ApiProperty({ type: String })
  @IsString()
  name!: string;
}

export class GetProfileImgDto {
  @ApiProperty({ type: String })
  @IsUUID()
  user_id: string;
}

export class GetProfileImgResponse {
  @ApiPropertyOptional({ type: String, format: 'binary' })
  @IsString()
  @IsOptional()
  img?: Buffer<ArrayBufferLike>;
}
