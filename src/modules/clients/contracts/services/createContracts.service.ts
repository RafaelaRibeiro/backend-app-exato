import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateContractDTO } from '../contracts.dto';

@Injectable()
export class CreateContractService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateContractDTO, client_id: number) {
    const contract = await this.prisma.contract.create({
      data: { client_id, ...data },
    });

    return contract;
  }
}
