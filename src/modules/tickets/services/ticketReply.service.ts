import { Injectable } from '@nestjs/common';
import { CreateTicketContentDto } from '../tickets.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { TicketQueryService } from './ticketQuery.service';
import { MailerService } from 'src/shared/providers/mail/mailer.service';

@Injectable()
export class TicketReplyService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailerService: MailerService,
    private readonly findOne: TicketQueryService,
  ) {}
  async ticketReply(data: CreateTicketContentDto, ticket_id: number) {
    try {
      const ticket = await this.findOne.findOne(ticket_id);

      const reply = await this.prisma.ticketContent.create({
        data: { ...data, ticket_id },
      });

      console.log(ticket);

      await this.mailerService.sendEmail(
        ticket.user.email,
        ticket.id,
        ticket.subject,
        ticket.agent.name,
        ticket.user.name,
        reply.content,
      );

      return reply;
    } catch (error) {
      console.log(error);
      throw new Error('Erro ao responder ao chamado.');
    }
  }
}
