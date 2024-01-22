import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/shared/prisma/prisma.service';
import { FindTimesheetsService } from './findTimesheets.service';

@Injectable()
export class RemoveTimesheetService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly findTimesheetService: FindTimesheetsService,
  ) {}
  async remove(id: number, user_id: number) {
    await this.findTimesheetService.findOne(id, user_id);

    const timesheet = await this.prisma.timesheet.delete({
      where: { id },
    });

    return timesheet;
  }
}
