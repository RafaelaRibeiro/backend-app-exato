import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class TicketDeletionService {
  constructor(private readonly prisma: PrismaService) {}
  private async delete(ids: number[]) {
    // if (!ids.length) {
    //   throw new NotFoundException('No tickets provided for deleted.');
    // }
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

    await this.prisma.ticket.deleteMany({
      where: { id: { in: existingTicketIds } },
    });

    return 'Ticket delete with success!';
  }
  async deleteTickets(ids: number[]) {
    return this.delete(ids);
  }

  async deleteTicketById(id: number) {
    return this.delete([id]);
  }
}
