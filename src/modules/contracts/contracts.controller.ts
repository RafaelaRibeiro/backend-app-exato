import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Get,
} from '@nestjs/common';

import { CreateContractService } from './services/createContracts.service';
import { CreateContractDTO } from './contracts.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FindContractsService } from './services/findContracts.service';

@ApiTags('contracts')
@Controller('contracts')
export class ContractController {
  constructor(
    private readonly createContractService: CreateContractService,
    private readonly findContractsService: FindContractsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new contract for a client' })
  @ApiParam({
    name: 'client_id',
    type: Number,
    description: 'ID of the client',
  })
  @ApiBody({ type: CreateContractDTO })
  @ApiResponse({ status: 201, description: 'Contract successfully created' })
  async createContract(
    @Param('client_id', ParseIntPipe) client_id: number,
    @Body() data: CreateContractDTO,
  ) {
    return this.createContractService.create(data, client_id);
  }

  @Get()
  @ApiOperation({ summary: 'Find contracts for a client' })
  async findAll() {
    return this.findContractsService.findAll();
  }
}
