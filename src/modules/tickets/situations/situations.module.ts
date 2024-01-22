import { Module } from '@nestjs/common';
import { SituationsService } from './situations.service';
import { SituationsController } from './situations.controller';
import { PrismaModule } from 'src/shared/prisma/prisma.module';

@Module({
  controllers: [SituationsController],
  providers: [SituationsService],
  imports: [PrismaModule],
})
export class SituationsModule {}
