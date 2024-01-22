import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsOptional,
  IsInt,
  MaxLength,
  IsString,
  IsDateString,
} from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty()
  @IsInt()
  user_id: number;

  @IsOptional()
  @IsInt()
  client_id?: number;

  @IsOptional()
  @IsInt()
  department_id?: number;

  @IsNotEmpty()
  @MaxLength(50)
  subject: string;

  @IsNotEmpty()
  @IsInt()
  category_id: number;

  @IsNotEmpty()
  @IsInt()
  priority_id: number;

  @IsOptional()
  @IsInt()
  approver_id?: number;

  @IsOptional()
  @IsInt()
  agent_id?: number;

  @IsOptional()
  @IsInt()
  situation_id?: number;

  @IsOptional()
  @IsDateString()
  deadline?: Date;

  @IsNotEmpty()
  content: string;
}

export class CreateTicketContentDto {
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  @IsInt()
  user_id: number;

  @IsNotEmpty()
  @IsString()
  type: string;
}

export class UpdateTicketDTO extends PartialType(CreateTicketDto) {}

export class DeleteFileDto {
  @IsInt()
  file_id: number;

  @IsString()
  file_key: string;
}
