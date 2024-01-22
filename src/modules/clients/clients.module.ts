import { Module } from '@nestjs/common';

import { ClientsController } from './clients.controller';
import { CreateClientsService } from './services/createClient.service';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { FindClientService } from './services/findClient.service';
import { UpdateClientService } from './services/updateClient.service';
import { UsersModule } from './users/users.module';
import { FindApproversService } from './services/findApprovers.service';
import { FindUsersByClientService } from './users/services/findUsersByClient.service';

@Module({
  controllers: [ClientsController],
  providers: [
    CreateClientsService,
    FindClientService,
    UpdateClientService,
    FindApproversService,
    FindUsersByClientService,
  ],
  imports: [PrismaModule, UsersModule],
  exports: [FindClientService],
})
export class ClientsModule {}
