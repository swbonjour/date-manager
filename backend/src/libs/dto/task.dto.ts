import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsISO8601,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ActivityTypeEnum } from './activity-type.enum';
import { ApiEnumProperty } from 'src/config/conf-swagger';

export class TaskDto {
  @ApiProperty({ type: String })
  @IsUUID()
  _id!: string;

  user_id!: string;

  @ApiProperty({ type: String })
  @IsString()
  label!: string;

  @ApiEnumProperty(() => ActivityTypeEnum)
  @IsEnum(ActivityTypeEnum)
  type!: ActivityTypeEnum;

  @ApiProperty({ type: String, nullable: false })
  @IsDateString()
  @IsISO8601()
  date!: string;

  @ApiProperty({ type: String, nullable: false })
  @IsDateString()
  @IsISO8601()
  start!: string;

  @ApiProperty({ type: String, nullable: false })
  @IsDateString()
  @IsISO8601()
  finish!: string;

  @ApiPropertyOptional({ type: String, nullable: true })
  @IsString()
  @IsOptional()
  description?: string;
}

export class TaskGetByDateDto {
  @ApiProperty({ type: String, nullable: false })
  @IsDateString()
  @IsISO8601()
  date!: string;

  user_id!: string;
}

export class TaskCreateDto {
  @ApiProperty({ type: String })
  @IsString()
  label!: string;

  @ApiEnumProperty(() => ActivityTypeEnum)
  @IsEnum(ActivityTypeEnum)
  type!: ActivityTypeEnum;

  @ApiProperty({ type: String, nullable: false })
  @IsDateString()
  @IsISO8601()
  date!: string;

  @ApiProperty({ type: String, nullable: false })
  @IsDateString()
  @IsISO8601()
  start!: string;

  @ApiProperty({ type: String, nullable: false })
  @IsDateString()
  @IsISO8601()
  finish!: string;

  @ApiPropertyOptional({ type: String, nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  user_id!: string;
}

export class TaskUpdateDto {
  @ApiProperty({ type: String })
  @IsUUID()
  _id!: string;

  @ApiProperty({ type: String })
  @IsString()
  label!: string;

  @ApiEnumProperty(() => ActivityTypeEnum)
  @IsEnum(ActivityTypeEnum)
  type!: ActivityTypeEnum;

  @ApiProperty({ type: String, nullable: false })
  @IsDateString()
  @IsISO8601()
  date!: string;

  @ApiProperty({ type: String, nullable: false })
  @IsDateString()
  @IsISO8601()
  start!: string;

  @ApiProperty({ type: String, nullable: false })
  @IsDateString()
  @IsISO8601()
  finish!: string;

  @ApiPropertyOptional({ type: String, nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  user_id!: string;
}

export class TaskDeleteDto {
  @ApiProperty({ type: String })
  @IsUUID()
  _id!: string;
}
