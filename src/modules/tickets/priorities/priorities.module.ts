import { Module } from '@nestjs/common';
import { PrioritiesService } from './priorities.service';
import { PrioritiesController } from './priorities.controller';
import { PrismaModule } from 'src/shared/prisma/prisma.module';

@Module({
  controllers: [PrioritiesController],
  providers: [PrioritiesService],
  imports: [PrismaModule],
})
export class PrioritiesModule {}
