import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserService } from './services/createUserService.service';
import { ChangePasswordDTO, CreateUserDTO, UpdateUserDTO } from './users.dto';
import { ApiTags } from '@nestjs/swagger';
import { FindUsersService } from './services/findUsers.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUsersService } from './services/updateuser.service';

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
    private readonly updateUserService: UpdateUsersService,
  ) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.createUserService.create(data);
  }

  @Get()
  async findMany() {
    return this.findUserService.findMany();
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

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDTO,
  ) {
    return this.updateUserService.updateUser(id, data);
  }

  @Put(':id/change-password')
  async updatePassword(@Request() req: any, @Body() data: ChangePasswordDTO) {
    return this.updateUserService.updatePassword(req.user.id, data);
  }
}
