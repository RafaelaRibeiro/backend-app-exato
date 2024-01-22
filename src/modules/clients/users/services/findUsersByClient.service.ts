import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class FindUsersByClientService {
  constructor(private readonly prisma: PrismaService) {}

  async findClientsByUser(user_id: number) {
    const clients = await this.prisma.userClients.findMany({
      where: { user_id },
      select: {
        client_id: true,
        client: {
          select: {
            trade_name: true,
          },
        },
      },
    });

    if (clients.length === 0)
      throw new NotFoundException('No clients found for the given user');

    return clients;
  }

  async findMany() {
    try {
      const users = await this.prisma.userClients.findMany({
        where: {
          user: {
            status: 'A',
          },
        },
        select: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
              profile: true,
            },
          },
          client: {
            select: {
              id: true,
              trade_name: true,
            },
          },
        },
      });

      return users;
    } catch (error) {
      console.log(error);
    }
  }
}
