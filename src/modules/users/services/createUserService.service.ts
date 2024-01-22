import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/prisma/prisma.service';
import { CreateUserDTO } from '../users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDTO) {
    const checkEmail = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (checkEmail) throw new ConflictException('E-mail already exists');

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: passwordHash,
      },
    });

    return {
      ...user,
      password: undefined,
    };
  }
}
