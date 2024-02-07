import {
  IsInt,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsDate,
  IsDecimal,
} from 'class-validator';

export class CreateContractDTO {
  @IsInt()
  @IsNotEmpty()
  client_id: number;

  @IsDate()
  @IsNotEmpty()
  initial_date: Date;

  @IsDate()
  @IsOptional()
  final_date?: Date;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsInt()
  @IsOptional()
  limit?: number;

  @IsDecimal()
  @IsOptional()
  package_value?: number;

  @IsDecimal()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsOptional()
  observation?: string;

  @IsString()
  @IsOptional()
  status?: string;
}
