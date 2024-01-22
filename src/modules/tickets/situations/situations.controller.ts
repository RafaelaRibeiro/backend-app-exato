import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { SituationsService } from './situations.service';
import { CreateSituationDTO, UpdateSituationDTO } from './situation.dto';

@Controller('situations')
export class SituationsController {
  constructor(private readonly situationsService: SituationsService) {}

  @Post()
  create(@Body() createPriorityDto: CreateSituationDTO) {
    return this.situationsService.create(createPriorityDto);
  }

  @Get()
  findAll() {
    return this.situationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.situationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePriorityDto: UpdateSituationDTO,
  ) {
    return this.situationsService.update(id, updatePriorityDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.situationsService.remove(id);
  }
}
