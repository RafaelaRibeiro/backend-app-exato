import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { FindClientService } from './findClient.service';

@Injectable()
export class FindApproversService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly findClientsService: FindClientService,
  ) {}
  async findApproversByClient(client_id: number) {
    await this.findClientsService.findOne(client_id);

    const approvers = await this.prisma.user.findMany({
      where: {
        UserClients: { some: { client_id } },
        UserPermissions: { some: { permission_id: 14 } },
      },
      select: {
        id: true,
        name: true,
      },
    });

    return approvers;
  }
}
