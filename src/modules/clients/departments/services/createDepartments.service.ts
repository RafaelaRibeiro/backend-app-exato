import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateDepartmentDTO } from '../departments.dto';
import { FindClientService } from '../../services/findClient.service';

@Injectable()
export class CreateDepartmentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly findClientService: FindClientService,
  ) {}

  async create(data: CreateDepartmentDTO, client_id: number) {
    try {
      await this.findClientService.findOne(client_id);
      const department = await this.prisma.department.create({
        data: { client_id, ...data },
      });

      return department;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      // You can log the error here for debugging purposes.
      console.error('Error creating department:', error);
      throw new InternalServerErrorException(
        'Failed to create the department.',
      );
    }
  }
}
