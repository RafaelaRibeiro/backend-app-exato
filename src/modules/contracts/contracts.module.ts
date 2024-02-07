import { Module } from '@nestjs/common';

import { CreateContractService } from './services/createContracts.service';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { ContractController } from './contracts.controller';
import { FindContractsService } from './services/findContracts.service';

@Module({
  controllers: [ContractController],
  providers: [CreateContractService, FindContractsService],
  imports: [PrismaModule],
})
export class ContractsModule {}
