import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePriorityDTO, UpdatePriorityDTO } from './priority.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class PrioritiesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreatePriorityDTO) {
    try {
      return await this.prisma.priority.create({ data });
    } catch (error) {
      console.error('Error creating priority:', error);
      throw new InternalServerErrorException('Failed to create the priority.');
    }
  }

  async findAll() {
    return await this.prisma.priority.findMany();
  }

  async findOne(id: number) {
    const priority = await this.prisma.priority.findUnique({ where: { id } });
    if (!priority) {
      throw new NotFoundException(`Priority with ID ${id} not found`);
    }
    return priority;
  }
  async update(id: number, data: UpdatePriorityDTO) {
    try {
      return await this.prisma.priority.update({ where: { id }, data });
    } catch (error) {
      console.error('Error updating priority:', error);
      throw new InternalServerErrorException('Failed to update the priority.');
    }
  }

  async remove(id: number) {
    const priority = await this.prisma.priority.findUnique({ where: { id } });
    if (!priority) {
      throw new NotFoundException(`Priority with ID ${id} not found`);
    }

    try {
      return await this.prisma.priority.delete({ where: { id } });
    } catch (error) {
      console.error('Error removing priority:', error);
      throw new InternalServerErrorException('Failed to remove the priority.');
    }
  }
}
