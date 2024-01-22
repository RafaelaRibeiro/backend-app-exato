import { FindUsersByClientService } from './services/findUsersByClient.service';
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(
    private readonly findUsersByClientService: FindUsersByClientService,
  ) {}

  @Get(':user_id/clients')
  async findClientsByUser(@Param('id', ParseIntPipe) userId: number) {
    return this.findUsersByClientService.findClientsByUser(userId);
  }

  @Get('clients')
  async findAll() {
    return this.findUsersByClientService.findMany();
  }
}
