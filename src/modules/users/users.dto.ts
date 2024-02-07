import { PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsInt,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  password: string;

  @IsString()
  @MinLength(4)
  confirmPassword: string;

  @IsInt()
  @IsOptional()
  department_id?: number;

  @IsInt()
  @IsOptional()
  client_id?: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1)
  profile: string;

  @IsInt()
  @IsOptional()
  fone?: number;

  @IsInt()
  @IsOptional()
  extension?: number;

  @IsInt()
  @IsOptional()
  mobile?: number;

  @IsBoolean()
  @IsOptional()
  whatsapp?: boolean;

  @IsString()
  @IsOptional()
  observation: string;

  @IsString()
  @IsOptional()
  remote_connection: string;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
