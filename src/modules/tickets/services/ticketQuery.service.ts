import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class TicketQueryService {
  constructor(private readonly prisma: PrismaService) {}

  private static ticketTypeMap = {
    A: ['A'],
    C: ['C'],
    O: ['O'],
    P: ['P'],
    T: ['A', 'C', 'O', 'P'],
  };

  private async queryTickets(whereConditions: any, situationType: string[]) {
    return this.prisma.ticket.findMany({
      where: {
        ...whereConditions,
        situation: {
          type: { in: situationType },
        },
      },
      include: {
        user: { select: { name: true } },
        category: { select: { name: true } },
        situation: { select: { name: true, colors: true, type: true } },
        agent: { select: { name: true } },
        priority: { select: { name: true } },
        client: { select: { trade_name: true } },
      },
      orderBy: {
        updated_at: 'desc',
      },
    });
  }
  async findTicketById(id: number) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id },
      select: {
        id: true,
        subject: true,
        client_id: true,
        deadline: true,
        situation_id: true,
        category_id: true,
        priority_id: true,
        agent_id: true,
        approver_id: true,

        user: {
          select: {
            id: true,
            name: true,
            profile: true,
            email: true,
            mobile: true,
            whatsapp: true,
            fone: true,
            extension: true,
          },
        },
        approver: { select: { id: true, name: true } },
        category: { select: { name: true } },
        situation: { select: { name: true, colors: true } },
        agent: { select: { name: true } },
        priority: { select: { name: true } },
        client: { select: { trade_name: true } },
      },
    });
    if (!ticket)
      throw new NotFoundException('No ticket found with the given ID');

    const client = await this.prisma.client.findFirst({
      where: { id: ticket?.client_id ?? 0 },
    });

    if (!client)
      throw new NotFoundException('No Client found with the given ID');

    const ticketContent = await this.prisma.ticketContent.findMany({
      where: { ticket_id: Number(id) },
      include: { user: { select: { name: true, profile: true } } },
      orderBy: { created_at: 'desc' },
    });
    const content = ticketContent.map((d) => ({
      ...d,
      content: d.content.toString(),
    }));

    return { ticket, content, client };
  }

  async listTickets(user_id, ticketType: 'A' | 'C' | 'T' | 'O' | 'P') {
    const user = await this.prisma.user.findFirst({
      where: { id: user_id },
      include: {
        UserClients: { select: { client_id: true } },
        UserRoles: { select: { role_id: true } },
      },
    });

    const situationType = TicketQueryService.ticketTypeMap[ticketType];

    const userRole = user?.UserRoles[0]?.role_id;

    let whereClause;

    switch (userRole) {
      case 1:
      case 2:
      case 6:
        whereClause = {
          situation: { type: { in: situationType } },
        };
        break;

      case 3:
        whereClause = {
          client_id: {
            in: user?.UserClients.map((client) => client.client_id),
          },
          situation: { type: { in: situationType } },
        };
        break;
      case 4:
        whereClause = {
          department_id: user?.department_id,
          situation: { type: { in: situationType } },
        };
        break;
      case 5:
        whereClause = {
          user_id,
          situation: { type: { in: situationType } },
        };
        break;
      default:
        throw new Error('Unauthorized access');
    }

    return this.queryTickets(whereClause, situationType);
  }

  async listUserTickets(
    user_id: number,
    ticketType: 'A' | 'C' | 'T' | 'O' | 'P',
  ) {
    const situationType = TicketQueryService.ticketTypeMap[ticketType];
    return this.queryTickets({ user_id }, situationType);
  }

  async findOne(id: number) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id },
      select: {
        id: true,
        user_id: true,
        subject: true,
        user: { select: { name: true, email: true } },
        agent: { select: { name: true } },
      },
    });
    if (!ticket) throw new NotFoundException('Not ticket found the given ID');
    return ticket;
  }

  async findTicketsByCards(user_id: number) {
    const userRoles = await this.prisma.userRoles.findFirst({
      where: { user_id },
    });

    let countTickets;

    switch (userRoles?.role_id) {
      case 1:
      case 2:
      case 6:
        countTickets = await this.prisma
          .$queryRaw`SELECT situations.id, situations.name,  CAST(COUNT(tickets.id) AS CHAR) AS ticketCount FROM situations LEFT JOIN tickets ON situations.id = tickets.situation_id WHERE situations.id NOT IN (2,6) GROUP BY situations.id, situations.name ORDER BY situations.order
      `;
        break;

      default:
        throw new Error('Unauthorized access');
    }

    return countTickets;
  }
}
