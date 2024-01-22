import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserService } from './services/createUserService.service';
import { CreateUserDTO } from './users.dto';
import { ApiTags } from '@nestjs/swagger';
import { FindUsersService } from './services/findUsers.service';
import { AuthGuard } from '@nestjs/passport';

interface AuthenticatedRequest extends Request {
  user: {
    id: number;
  };
}

@ApiTags('users')
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly findUserService: FindUsersService,
  ) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.createUserService.create(data);
  }
  @Get('clients')
  async listTickets(@Request() req: AuthenticatedRequest) {
    const userId = Number(req.user.id);
    return this.findUserService.findClients(userId);
  }
  @Get('agents')
  async findAgents() {
    return this.findUserService.findAgents();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.findUserService.findOne(id);
  }
}
