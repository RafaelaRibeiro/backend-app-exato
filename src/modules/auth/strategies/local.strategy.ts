import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  async validate(req: any, email: string, password: string): Promise<any> {
    let appType: 'app' | 'portal';

    if (req.route.path === '/auth/app') {
      appType = 'app';
    } else if (req.route.path === '/auth/portal') {
      appType = 'portal';
    } else {
      throw new UnauthorizedException('Unknown authentication type');
    }

    const user = await this.authService.validateUser(email, password, appType);

    if (!user) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    return user;
  }
}
