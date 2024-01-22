import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { MailerService } from './mailer.service';

@Module({
  providers: [MailerService],
  imports: [PrismaModule],
})
export class MailerModule {}
