import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class FindContractsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const contracts = await this.prisma.contract.findMany({
      select: {
        id: true,
        initial_date: true,
        final_date: true,
        type: true,
        price: true,
        limit: true,
        due_day: true,
        status: true,
        client: {
          select: {
            trade_name: true,
          },
        },
      },
    });

    return contracts;
  }

  async findByClient(client_id: number) {
    const contracts = await this.prisma.contract.findMany({
      where: { client_id },
    });

    return contracts;
  }
}
