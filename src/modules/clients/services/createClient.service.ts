import { ConflictException, Injectable } from '@nestjs/common';
import { CreateClientDTO } from '../clients.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class CreateClientsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateClientDTO) {
    const clientCount = await this.prisma.client.count({
      where: { cgc: data.cgc },
    });
    if (clientCount > 0) throw new ConflictException('CNPJ already exists');

    const client = await this.prisma.client.create({ data });

    return client;
  }
}
