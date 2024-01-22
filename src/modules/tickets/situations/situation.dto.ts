import { PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsInt } from 'class-validator';

export enum SituationStatus {
  A = 'A', //Active,
  I = 'I', //Inactive,
}

export enum SituationType {
  A = 'A', // Aguardando Validação ( Awaiting Validation)
  O = 'O', // Aberto (open)
  C = 'C', // Fechado (Closed)
  P = 'P', // Pendente (Pending)
}

export class CreateSituationDTO {
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(SituationStatus)
  status?: SituationStatus;

  @IsOptional()
  @IsString()
  colors?: string;

  @IsOptional()
  @IsInt()
  order?: number;

  @IsOptional()
  @IsEnum(SituationType)
  type?: SituationType;
}

export class UpdateSituationDTO extends PartialType(CreateSituationDTO) {}
