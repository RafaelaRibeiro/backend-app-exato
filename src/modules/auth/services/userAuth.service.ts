/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class UserAuthService {
  constructor(private readonly prisma: PrismaService) {}
  async authUser(user_id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: user_id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        profile: true,
        department_id: true,
      },
    });

    return { user };
  }
}
