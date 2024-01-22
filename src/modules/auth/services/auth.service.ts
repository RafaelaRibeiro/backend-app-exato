import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { FindUsersService } from '../../users/services/findUsers.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/shared/prisma/prisma.service';

const INVALID_CREDENTIALS = 'E-mail ou senha incorreto!';

@Injectable()
export class AuthService {
  constructor(
    private readonly findUsersService: FindUsersService,
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
    appType: 'app' | 'portal',
  ) {
    const user = await this.findUsersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException(INVALID_CREDENTIALS);
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException(INVALID_CREDENTIALS);
    }

    const roles = await this.prisma.userRoles.findFirst({
      where: { user_id: user.id },
    });
    let allowedRolesForApp = [];
    switch (appType) {
      case 'app':
        allowedRolesForApp = [1, 2, 6];
        break;
      case 'portal':
        allowedRolesForApp = [3, 4, 5];
        break;
    }

    if (!roles) {
      throw new UnauthorizedException('Role not found');
    }
    if (!allowedRolesForApp.includes(roles.role_id)) {
      throw new UnauthorizedException(
        'Você não tem autorização para acessar essa página',
      );
    }

    return { id: user.id, email: user.email, roles: [roles.role_id] };
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  catch(error) {
    console.log(error.stack);
  }
}
