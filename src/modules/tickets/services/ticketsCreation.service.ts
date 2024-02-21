import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateTicketDto } from '../tickets.dto';
import { NotificationsService } from 'src/modules/notifications/notifications.service';

@Injectable()
export class TicketCreationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationService: NotificationsService,
  ) {}

  async create(ticket: CreateTicketDto) {
    const createTicket = await this.prisma.ticket.create({
      data: {
        user_id: ticket.user_id,
        client_id: ticket.client_id,
        department_id: ticket.department_id,
        category_id: ticket.category_id,
        priority_id: ticket.priority_id,
        approver_id: ticket.approver_id,
        agent_id: ticket.agent_id,
        deadline: ticket.deadline,
        subject: ticket.subject,
        situation_id: 1,
        TicketContent: {
          create: {
            content: ticket.content,
            user_id: ticket.user_id,
            type: 'C',
          },
        },
      },
      include: {
        TicketContent: true,
      },
    });

    const notificationData = {
      title: 'Novo chamado criado',
      message: `Um novo chamado foi criado: #${createTicket.id} - ${createTicket.subject} `,
      type: 'client',
      user_id: ticket.user_id,
      ticket_id: createTicket.id,
    };

    console.log(notificationData);

    await this.notificationService.createNotification(notificationData);

    return createTicket;
  }
}
