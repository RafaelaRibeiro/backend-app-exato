import { Module } from '@nestjs/common';

import { TicketsController } from './tickets.controller';
import { TicketCreationService } from './services/ticketsCreation.service';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { TicketQueryService } from './services/ticketQuery.service';
import { TicketsApprovalService } from './services/ticketApproval.service';
import { TicketReplyService } from './services/ticketReply.service';
import { TicketDeletionService } from './services/ticketDeletion.service';
import { TicketUpdateService } from './services/ticketUpdate.service';
import { TicketsAttachmentService } from './services/ticketAttachment.service';
import { FilesController } from './files.controller';
import { MailerService } from 'src/shared/providers/mail/mailer.service';

@Module({
  controllers: [TicketsController, FilesController],
  providers: [
    TicketCreationService,
    TicketQueryService,
    TicketsApprovalService,
    TicketReplyService,
    TicketDeletionService,
    TicketUpdateService,
    TicketsAttachmentService,
    MailerService,
  ],
  imports: [PrismaModule],
  exports: [TicketQueryService],
})
export class TicketsModule {}
