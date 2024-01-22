import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateSituationDTO, UpdateSituationDTO } from './situation.dto';

@Injectable()
export class SituationsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateSituationDTO) {
    try {
      return await this.prisma.situation.create({ data });
    } catch (error) {
      console.error('Error creating situation:', error);
      throw new InternalServerErrorException('Failed to create the situation.');
    }
  }

  async findAll() {
    return await this.prisma.situation.findMany();
  }

  async findOne(id: number) {
    const situation = await this.prisma.situation.findUnique({ where: { id } });
    if (!situation) {
      throw new NotFoundException(`Situation with ID ${id} not found`);
    }
    return situation;
  }
  async update(id: number, data: UpdateSituationDTO) {
    try {
      return await this.prisma.situation.update({ where: { id }, data });
    } catch (error) {
      console.error('Error updating situation:', error);
      throw new InternalServerErrorException('Failed to update the situation.');
    }
  }

  async remove(id: number) {
    const situation = await this.prisma.situation.findUnique({ where: { id } });
    if (!situation) {
      throw new NotFoundException(`Situation with ID ${id} not found`);
    }

    try {
      return await this.prisma.situation.delete({ where: { id } });
    } catch (error) {
      console.error('Error removing situation:', error);
      throw new InternalServerErrorException('Failed to remove the situation.');
    }
  }
}
