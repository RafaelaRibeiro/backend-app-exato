import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { FindClientService } from '../../services/findClient.service';

@Injectable()
export class FindDepartmentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly findClientService: FindClientService,
  ) {}

  async findAll(client_id: number) {
    await this.findClientService.findOne(client_id);

    const departments = await this.prisma.department.findMany({
      where: { client_id },
    });
    return departments;
  }

  async findOne(client_id: number, id: number) {
    await this.findClientService.findOne(client_id);

    const department = await this.prisma.department.findFirst({
      where: { client_id, id },
    });
    return department;
  }
}
