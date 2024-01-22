import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class FindContractsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(client_id: number) {
    const contracts = await this.prisma.contract.findMany({
      where: { client_id },
    });

    return contracts;
  }
}
