import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTimesheetDTO {
  @IsInt()
  @ApiProperty()
  client_id: number;

  @IsDateString()
  @ApiProperty()
  date: Date;

  @IsOptional()
  @IsString()
  @ApiProperty()
  start_time?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  end_time?: string;

  @IsOptional()
  @IsInt()
  @ApiProperty()
  interval?: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  activities?: string;

  @IsOptional()
  @IsInt()
  @ApiProperty()
  ticket_id?: number;
}

export class FindTimesheetsByDateDto {
  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  endDate: Date;

  @IsNotEmpty()
  @IsNumberString()
  client_id: string;
}

export class FindTimesheetsDTO {
  selectedMonth: any;
  selectedYear: any;
}

export class UpdateTimesheetDTO extends PartialType(CreateTimesheetDTO) {}
