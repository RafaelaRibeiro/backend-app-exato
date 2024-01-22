import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { FindUsersByClientService } from './services/findUsersByClient.service';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { FindClientService } from '../services/findClient.service';

@Module({
  controllers: [UsersController],
  providers: [FindUsersByClientService, FindClientService],
  imports: [PrismaModule],
})
export class UsersModule {}
