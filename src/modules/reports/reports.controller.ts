import { Body, Controller, Post } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportTimesheetByClientsDTO } from './reports.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post('timesheets-by-clients')
  async findTimesheetsByClient(@Body() data: ReportTimesheetByClientsDTO) {
    return this.reportsService.findTimesheetsByClient(data);
  }
}
