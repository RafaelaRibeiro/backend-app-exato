import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/shared/prisma/prisma.service';

import * as bcrypt from 'bcrypt';
import { UpdateUserDTO } from '../users.dto';

@Injectable()
export class UpdateUsersService {
  constructor(private readonly prisma: PrismaService) {}
  async updateUser(user_id: number, data: UpdateUserDTO) {
    const user = await this.prisma.user.update({
      where: { id: user_id },
      data,
    });

    return { ...user, password: undefined };
  }

  async updatePassword(
    id: number,
    password: string,
    newPassword: string,
    confirmPassword: string,
  ) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const isPasswordCorrect = await this.comparePasswords(
      password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new BadRequestException('Senha atual incorreta');
    }

    if (newPassword !== confirmPassword) {
      throw new BadRequestException(
        'A nova senha e a confirmação de senha não coincidem.',
      );
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    return await this.prisma.user.update({
      where: { id: user.id },
      data: { password: passwordHash },
    });
  }

  private async comparePasswords(
    inputPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(inputPassword, hashedPassword);
  }
}
