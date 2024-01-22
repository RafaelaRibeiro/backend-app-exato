import {
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Get,
  Put,
  Body,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateDepartmentsService } from './services/createDepartments.service';
import { FindDepartmentsService } from './services/findDepartment.service';
import { UpdateDepartmentService } from './services/updateDepartment.service';
import { CreateDepartmentDTO, UpdateDepartmentDTO } from './departments.dto';

@ApiTags('departments')
@Controller('clients/:client_id/departments')
export class DepartmentsController {
  constructor(
    private readonly createDepartmentsService: CreateDepartmentsService,
    private readonly findDepartmentsService: FindDepartmentsService,
    private readonly updateDepartmentService: UpdateDepartmentService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new department for a client' })
  @ApiBody({ type: CreateDepartmentDTO })
  @ApiResponse({ status: 201, description: 'Department successfully created' })
  async createDepartment(
    @Param('client_id', ParseIntPipe) clientId: number,
    @Body() createDepartmentDto: CreateDepartmentDTO,
  ) {
    return this.createDepartmentsService.create(createDepartmentDto, clientId);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all departments for a client' })
  @ApiParam({ name: 'client_id', description: 'ID of the client to retrieve' })
  @ApiResponse({
    status: 200,
    description: 'Departments retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'Client not found' })
  async findAll(@Param('client_id', ParseIntPipe) clientId: number) {
    return this.findDepartmentsService.findAll(clientId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific department by ID' })
  @ApiParam({ name: 'client_id', description: 'ID of the client' })
  @ApiParam({ name: 'id', description: 'ID of the department to retrieve' })
  @ApiResponse({
    status: 200,
    description: 'Department retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'Department not found' })
  async findOne(
    @Param('client_id', ParseIntPipe) clientId: number,
    @Param('id', ParseIntPipe) departmentId: number,
  ) {
    return this.findDepartmentsService.findOne(clientId, departmentId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a department for a client' })
  @ApiParam({ name: 'client_id', description: 'ID of the client' })
  @ApiParam({ name: 'id', description: 'ID of the department to update' })
  @ApiBody({
    type: UpdateDepartmentDTO,
    description: 'Updated Department Data',
  })
  @ApiResponse({ status: 200, description: 'Department updated successfully' })
  @ApiResponse({ status: 404, description: 'Client or Department not found' })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Possible validation errors.',
  })
  async update(
    @Param('client_id', ParseIntPipe) clientId: number,
    @Param('id', ParseIntPipe) departmentId: number,
    @Body() updateDepartmentDto: UpdateDepartmentDTO,
  ) {
    return this.updateDepartmentService.update(
      updateDepartmentDto,
      clientId,
      departmentId,
    );
  }
}
