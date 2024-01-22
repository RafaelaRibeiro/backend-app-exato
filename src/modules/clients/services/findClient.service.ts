import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class FindClientService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const clients = await this.prisma.client.findMany({
      orderBy: { trade_name: 'asc' },
    });

    return clients;
  }

  async findOne(id: number) {
    console.log(typeof id, id);
    const client = await this.prisma.client.findUnique({ where: { id } });

    if (!client)
      throw new NotFoundException('No clients found with the given ID');

    return client;
  }
}
