import { PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, Length, IsNotEmpty } from 'class-validator';

export class CreateCategoryDTO {
  @IsString()
  @Length(1, 50)
  @IsNotEmpty()
  name: string;

  @IsString()
  @Length(1, 1)
  @IsOptional()
  status?: string;
}

export class UpdateCategoryDTO extends PartialType(CreateCategoryDTO) {}
