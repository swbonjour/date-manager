import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetAllUsersResponse {
  @ApiProperty({ type: String })
  @IsString()
  id!: string;

  @ApiProperty({ type: String })
  @IsString()
  login!: string;
}
