import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class TicketsApprovalService {
  constructor(private readonly prisma: PrismaService) {}
  private async updateSituation(ids: number[]): Promise<string> {
    if (!ids.length) {
      throw new NotFoundException('No tickets provided for approval.');
    }
    const existingTickets = await this.prisma.ticket.findMany({
      where: {
        id: { in: ids },
      },
      select: {
        id: true,
      },
    });

    if (!existingTickets.length)
      throw new NotFoundException('Not ticket found the given ID');

    const existingTicketIds = existingTickets.map((ticket) => ticket.id);
    await this.prisma.ticket.updateMany({
      where: {
        id: { in: existingTicketIds },
        situation_id: 4,
      },
      data: {
        situation_id: 5,
      },
    });

    await this.prisma.ticket.updateMany({
      where: {
        id: { in: existingTicketIds },
        situation_id: 3,
      },
      data: {
        situation_id: 2,
      },
    });

    return 'Atualização concluída com sucesso!';
  }
  async approveTickets(ids: number[]): Promise<string> {
    return this.updateSituation(ids);
  }
  async approveTicketsById(id: number): Promise<string> {
    return this.updateSituation([id]);
  }

  private async disapproveTickets(ids: number[]): Promise<string> {
    if (!ids.length) {
      throw new NotFoundException('No tickets provided for approval.');
    }
    const existingTickets = await this.prisma.ticket.findMany({
      where: {
        id: { in: ids },
      },
      select: {
        id: true,
      },
    });

    if (!existingTickets.length)
      throw new NotFoundException('Not ticket found the given ID');

    const existingTicketIds = existingTickets.map((ticket) => ticket.id);
    await this.prisma.ticket.updateMany({
      where: {
        id: { in: existingTicketIds },
        situation_id: 4,
      },
      data: {
        situation_id: 8,
      },
    });

    await this.prisma.ticket.updateMany({
      where: {
        id: { in: existingTicketIds },
        situation_id: 3,
      },
      data: {
        situation_id: 5,
      },
    });

    return 'Atualização concluída com sucesso!';
  }

  async disapproveTicketsSelect(ids: number[]): Promise<string> {
    return this.disapproveTickets(ids);
  }
  async disapproveTicketsById(id: number): Promise<string> {
    return this.disapproveTickets([id]);
  }
}
