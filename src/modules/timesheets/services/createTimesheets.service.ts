import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateTimesheetDTO } from '../timesheet.dto';

@Injectable()
export class CreateTimesheetService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateTimesheetDTO, user_id: number) {
    const checkTimesheet = await this.prisma.timesheet.findFirst({
      where: {
        client_id: data.client_id,
        date: new Date(data.date),
        start_time: data.start_time,
        end_time: data.end_time,
      },
    });

    if (checkTimesheet) throw new ConflictException('Timesheet already exists');

    const timesheet = await this.prisma.timesheet.create({
      data: { ...data, date: new Date(data.date), user_id },
    });

    return timesheet;
  }
}
