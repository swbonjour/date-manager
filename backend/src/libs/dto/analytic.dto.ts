import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AuthTokenData } from './auth.dto';
import { IsDateString, IsISO8601, IsNumber, IsOptional } from 'class-validator';

export class AnalyticScheduleBusyDto {
  user!: AuthTokenData;

  @ApiProperty({ type: String })
  @IsDateString()
  @IsISO8601()
  date!: string;
}

export class AnalyticScheduleBusyResponseDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  schedule_busy_minutes!: number;

  @ApiProperty({ type: String })
  @IsDateString()
  @IsISO8601()
  date!: string;
}

export class AnalyticScheduleBusyGetDto {
  user!: AuthTokenData;

  @ApiProperty({ type: String })
  @IsDateString()
  @IsISO8601()
  date!: string;
}

export class AnalyticScheduleBusyGetResponse {
  @ApiPropertyOptional({ type: Number })
  @IsNumber()
  @IsOptional()
  schedule_busy_minutes?: number;
}
