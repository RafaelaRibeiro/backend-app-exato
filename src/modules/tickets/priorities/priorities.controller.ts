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
import { PrioritiesService } from './priorities.service';
import { CreatePriorityDTO, UpdatePriorityDTO } from './priority.dto';

@Controller('priorities')
export class PrioritiesController {
  constructor(private readonly prioritiesService: PrioritiesService) {}

  @Post()
  create(@Body() createPriorityDto: CreatePriorityDTO) {
    return this.prioritiesService.create(createPriorityDto);
  }

  @Get()
  findAll() {
    return this.prioritiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.prioritiesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePriorityDto: UpdatePriorityDTO,
  ) {
    return this.prioritiesService.update(id, updatePriorityDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.prioritiesService.remove(id);
  }
}
