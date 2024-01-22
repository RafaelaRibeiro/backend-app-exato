import { Injectable } from '@nestjs/common';
import { UpdateTimesheetDTO } from '../timesheet.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { FindTimesheetsService } from './findTimesheets.service';

@Injectable()
export class UpdateTimesheetService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly findTimesheetService: FindTimesheetsService,
  ) {}
  async update(data: UpdateTimesheetDTO, id: number, user_id: number) {
    await this.findTimesheetService.findOne(id, user_id);

    const timesheet = await this.prisma.timesheet.update({
      where: { id },
      data,
    });

    return timesheet;
  }
}
