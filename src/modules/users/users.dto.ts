import { PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsInt,
  IsOptional,
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
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
