import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { UpdateTicketDTO } from '../tickets.dto';
import { TicketQueryService } from './ticketQuery.service';

@Injectable()
export class TicketUpdateService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ticketQueryService: TicketQueryService,
  ) {}

  async update(data: UpdateTicketDTO, id: number) {
    await this.ticketQueryService.findOne(id);

    const ticket = await this.prisma.ticket.update({
      where: { id },
      data: { ...data, deadline: new Date(data.deadline) },
    });

    return ticket;
  }

  async updateContent(content: string, id: number) {
    try {
      const ticketContent = this.prisma.ticketContent.update({
        where: { id },
        data: {
          content: content,
          ticket: {
            update: {
              updated_at: new Date(),
            },
          },
        },
      });

      return ticketContent;
    } catch (error) {}
  }
}
