import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { PrismaModule } from 'src/shared/prisma/prisma.module';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService],
  imports: [PrismaModule],
  exports: [NotificationsService],
})
export class NotificationsModule {}
