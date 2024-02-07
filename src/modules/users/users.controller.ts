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
import { CreateUserDTO, UpdateUserDTO } from './users.dto';
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
  async updatePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    passwordData: {
      password: string;
      newPassword: string;
      confirmPassword: string;
    },
  ) {
    const { password, newPassword, confirmPassword } = passwordData;
    return this.updateUserService.updatePassword(
      id,
      password,
      newPassword,
      confirmPassword,
    );
  }
}
