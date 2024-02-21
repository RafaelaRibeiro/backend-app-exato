import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNotificationDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsInt()
  user_id: number;

  @IsOptional()
  @IsInt()
  ticket_id: number;
}
