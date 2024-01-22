import {
  Controller,
  Get,
  InternalServerErrorException,
  Query,
  Body,
  Post,
  Param,
  ParseIntPipe,
  Put,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FindTimesheetsService } from './services/findTimesheets.service';
import {
  CreateTimesheetDTO,
  FindTimesheetsByDateDto,
  UpdateTimesheetDTO,
} from './timesheet.dto';

import { CreateTimesheetService } from './services/createTimesheets.service';
import { UpdateTimesheetService } from './services/updateTimesheet.service';
import { RemoveTimesheetService } from './services/removeTimesheet.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('timesheets')
export class TimesheetsController {
  constructor(
    private readonly findTimesheetsService: FindTimesheetsService,
    private readonly createTimesheetService: CreateTimesheetService,
    private readonly updateTimesheetService: UpdateTimesheetService,
    private readonly removeTimesheetService: RemoveTimesheetService,
  ) {}

  @Post()
  async create(@Body() data: CreateTimesheetDTO, @Request() req: any) {
    return this.createTimesheetService.create(data, req.user.id);
  }

  @Get()
  async findAll(
    @Query('selectedMonth') selectedMonth: any,
    @Query('selectedYear') selectedYear: any,
    @Request() req: any,
  ) {
    return this.findTimesheetsService.findAll(
      selectedMonth,
      selectedYear,
      req.user.id,
    );
  }

  @Get('ByDate')
  async findAllByDate(
    @Query() query: FindTimesheetsByDateDto,
    @Request() req: any,
  ) {
    try {
      return this.findTimesheetsService.findAllByDate(
        query.startDate,
        query.endDate,
        query.client_id,
        req.user_id,
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.findTimesheetsService.findOne(id, req.user.id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateTimesheetDTO,
    @Request() req: any,
  ) {
    return this.updateTimesheetService.update(data, id, req.user.id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.removeTimesheetService.remove(id, req.user.id);
  }
}
