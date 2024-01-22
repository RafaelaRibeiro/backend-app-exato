import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateClientDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(14)
  @ApiProperty()
  cgc: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  corporate_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  trade_name: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  municipal_registration?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  state_registration?: string;

  @IsString()
  @IsNotEmpty()
  @Length(1)
  @ApiProperty()
  status: string;
}

export class UpdateClientDTO {
  @IsOptional()
  @IsString()
  corporate_name?: string;

  @IsOptional()
  @IsString()
  trade_name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(14)
  cgc?: string;

  @IsOptional()
  @IsString()
  @MaxLength(8)
  cep?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsInt()
  number?: number;

  @IsOptional()
  @IsString()
  complement?: string;

  @IsOptional()
  @IsString()
  district?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2)
  uf?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  country?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(50)
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  site?: string;

  @IsOptional()
  @IsInt()
  fone?: number;

  @IsOptional()
  @IsString()
  head?: string;

  @IsOptional()
  @IsString()
  municipal_registration?: string;

  @IsOptional()
  @IsString()
  observation?: string;

  @IsOptional()
  @IsInt()
  ramal?: number;

  @IsOptional()
  @IsString()
  state_registration?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1)
  status?: string;
}
