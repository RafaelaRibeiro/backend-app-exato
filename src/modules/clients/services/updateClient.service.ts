import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { UpdateClientDTO } from '../clients.dto';

@Injectable()
export class UpdateClientService {
  constructor(private readonly prisma: PrismaService) {}

  async update(id: number, data: UpdateClientDTO) {
    const clientCount = await this.prisma.client.count({
      where: { id },
    });

    if (!clientCount)
      throw new NotFoundException('No clients found with the given ID');

    return await this.prisma.client.update({ where: { id }, data });
  }
}
