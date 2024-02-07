import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../../../shared/prisma/prisma.service';
import { CreateUserDTO } from '../users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDTO) {
    const { password, confirmPassword, client_id, ...rest } = data;
    const checkEmail = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (checkEmail) throw new ConflictException('E-mail already exists');
    if (password !== confirmPassword) {
      throw new BadRequestException(
        'Password and password confirmation do not match.',
      );
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...rest,
        password: passwordHash,
        UserClients: {
          create: {
            client_id: client_id,
          },
        },
      },
    });

    return {
      ...user,
      password: undefined,
    };
  }
}
