import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDTO, UpdateCategoryDTO } from './categories.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCategoryDTO) {
    try {
      return await this.prisma.category.create({ data });
    } catch (error) {
      console.error('Error creating category:', error);
      throw new InternalServerErrorException('Failed to create the category.');
    }
  }

  async findAll() {
    return await this.prisma.category.findMany();
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(id: number, data: UpdateCategoryDTO) {
    try {
      return await this.prisma.category.update({ where: { id }, data });
    } catch (error) {
      console.error('Error updating category:', error);
      throw new InternalServerErrorException('Failed to update the category.');
    }
  }

  async remove(id: number) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    try {
      return await this.prisma.category.delete({ where: { id } });
    } catch (error) {
      console.error('Error removing category:', error);
      throw new InternalServerErrorException('Failed to remove the category.');
    }
  }
}
