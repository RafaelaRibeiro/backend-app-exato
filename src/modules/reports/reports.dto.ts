import { IsInt, IsArray, ArrayNotEmpty, IsDateString } from 'class-validator';

export class ReportTimesheetByClientsDTO {
  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  clientsIds: number[];
}
