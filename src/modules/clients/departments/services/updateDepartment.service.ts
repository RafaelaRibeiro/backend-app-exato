import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { UpdateDepartmentDTO } from '../departments.dto';
import { FindDepartmentsService } from './findDepartment.service';

@Injectable()
export class UpdateDepartmentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly findDepartmentService: FindDepartmentsService,
  ) {}

  async update(data: UpdateDepartmentDTO, client_id: number, id: number) {
    await this.findDepartmentService.findOne(client_id, id);

    const department = await this.prisma.department.update({
      where: { id },
      data,
    });

    return department;
  }
}
