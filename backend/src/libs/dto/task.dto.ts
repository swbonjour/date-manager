import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { ActivityTypeEnum } from './activity-type.enum';
import { ApiEnumProperty } from 'src/config/const-swagger';

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

  @ApiProperty({ type: Date, nullable: false })
  @IsDate()
  @Type(() => Date)
  date!: Date;

  @ApiProperty({ type: Date, nullable: false })
  @IsDate()
  @Type(() => Date)
  start!: Date;

  @ApiProperty({ type: Date, nullable: false })
  @IsDate()
  @Type(() => Date)
  finish!: Date;

  @ApiPropertyOptional({ type: String, nullable: true })
  @IsString()
  @IsOptional()
  description?: string;
}

export class TaskGetByDateDto {
  @ApiProperty({ type: Date, nullable: false })
  @IsDate()
  @Type(() => Date)
  date!: Date;

  user_id!: string;
}

export class TaskCreateDto {
  @ApiProperty({ type: String })
  @IsString()
  label!: string;

  @ApiEnumProperty(() => ActivityTypeEnum)
  @IsEnum(ActivityTypeEnum)
  type!: ActivityTypeEnum;

  @ApiProperty({ type: Date, nullable: false })
  @IsDate()
  @Type(() => Date)
  date!: Date;

  @ApiProperty({ type: Date, nullable: false })
  @IsDate()
  @Type(() => Date)
  start!: Date;

  @ApiProperty({ type: Date, nullable: false })
  @IsDate()
  @Type(() => Date)
  finish!: Date;

  @ApiPropertyOptional({ type: String, nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  user_id!: string;
}
