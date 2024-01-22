import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsInt,
  Length,
  IsNotEmpty,
} from 'class-validator';

export class CreateDepartmentDTO {
  @ApiProperty({
    description: 'Name of the entity',
    maxLength: 50,
  })
  @IsString()
  @Length(1, 50)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'ID of the related client',
  })
  @IsInt()
  @IsNotEmpty()
  client_id: number;

  @ApiProperty({
    description: 'ID of the manager',
    required: false,
  })
  @IsInt()
  @IsOptional()
  manager_id?: number;

  @ApiProperty({
    description: 'Status of the entity',
    required: false,
    maxLength: 1,
  })
  @IsString()
  @Length(1, 1)
  @IsOptional()
  status?: string;
}

export class UpdateDepartmentDTO extends PartialType(CreateDepartmentDTO) {}
