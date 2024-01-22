import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FindClientService } from 'src/modules/clients/services/findClient.service';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class FindUsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly findClientsService: FindClientService,
  ) {}

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) throw new NotFoundException('User invalid');

    delete user.password;

    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findClients(user_id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: Number(user_id) },
      });

      if (!user) throw new NotFoundException('User not found');

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

      return clients;
    } catch (error) {
      // Se você quiser logar o erro real para depuração:
      console.error('Error on search client:', error);

      // Lança uma exceção geral
      throw new InternalServerErrorException('Error on search client.');
    }
  }

  async findAgents() {
    try {
      const agents = await this.prisma.user.findMany({
        where: { status: 'A', profile: { in: ['O', 'A'] } },
        select: { id: true, name: true, profile: true },
      });
      return agents;
    } catch (error) {
      console.log(error);
    }
  }
}
