import { Module } from '@nestjs/common';

import { DepartmentsController } from './departments.controller';
import { CreateDepartmentsService } from './services/createDepartments.service';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { FindDepartmentsService } from './services/findDepartment.service';
import { FindClientService } from '../services/findClient.service';
import { UpdateDepartmentService } from './services/updateDepartment.service';

@Module({
  controllers: [DepartmentsController],
  providers: [
    CreateDepartmentsService,
    FindDepartmentsService,
    FindClientService,
    UpdateDepartmentService,
  ],
  imports: [PrismaModule],
})
export class DepartmentsModule {}
