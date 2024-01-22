import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { CreateUserService } from './services/createUserService.service';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { FindUsersService } from './services/findUsers.service';
import { ClientsModule } from '../clients/clients.module';

@Module({
  controllers: [UsersController],
  providers: [CreateUserService, FindUsersService],
  exports: [CreateUserService, FindUsersService],
  imports: [PrismaModule, ClientsModule],
})
export class UsersModule {}
