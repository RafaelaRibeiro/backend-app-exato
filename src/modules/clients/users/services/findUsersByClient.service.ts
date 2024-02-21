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

    const newClients = clients.map((client) => {
      return {
        client_id: client.client_id,
        client_name: client.client.trade_name,
      };
    });

    return newClients;
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

  async findUsersByClients(client_id: number) {
    try {
      const users = await this.prisma.userClients.findMany({
        where: { client_id },
        select: {
          id: true,
          user: {
            select: {
              name: true,
              email: true,
              fone: true,
              profile: true,
              department: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

      return users;
    } catch (error) {
      console.log(error);
      throw new error('Error');
    }
  }
}
