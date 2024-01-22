import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateClientsService } from './services/createClient.service';
import { CreateClientDTO, UpdateClientDTO } from './clients.dto';
import { FindClientService } from './services/findClient.service';
import { UpdateClientService } from './services/updateClient.service';
import { FindApproversService } from './services/findApprovers.service';

@ApiTags('clients')
@Controller('clients')
export class ClientsController {
  constructor(
    private readonly createClientService: CreateClientsService,
    private readonly findClientService: FindClientService,
    private readonly updateClientService: UpdateClientService,
    private readonly findApproversService: FindApproversService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new client' })
  @ApiResponse({
    status: 201,
    description: 'The client has been successfully created.',
  })
  @ApiResponse({ status: 409, description: 'Conflict. CNPJ already exists.' })
  async create(@Body() data: CreateClientDTO) {
    return this.createClientService.create(data);
  }

  @Get()
  @ApiQuery({
    name: 'filter',
    required: false,
    description: 'A filter for the clients',
  })
  @ApiOperation({ summary: 'Retrieve all clients' })
  async findAll() {
    return this.findClientService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Client retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Client not found' })
  @ApiParam({ name: 'id', description: 'ID of the client to retrieve' })
  @ApiOperation({ summary: 'Retrieve a specific client by ID' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.findClientService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a specific client by ID' })
  @ApiResponse({ status: 200, description: 'Client updated successfully' })
  @ApiResponse({ status: 404, description: 'Client not found' })
  @ApiParam({ name: 'id', description: 'ID of the client to update' })
  @ApiBody({ type: UpdateClientDTO })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateClientDTO,
  ) {
    return this.updateClientService.update(id, data);
  }

  @Get(':client_id/approvers')
  @ApiOperation({ summary: 'Retrieve approvers for a specific client by ID' })
  @ApiResponse({ status: 200, description: 'Approvers retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Client not found' })
  @ApiParam({
    name: 'client_id',
    description: 'ID of the client to retrieve its approvers',
  })
  async findApproversByClient(
    @Param('client_id', ParseIntPipe) clientId: number,
  ) {
    return this.findApproversService.findApproversByClient(clientId);
  }
}
