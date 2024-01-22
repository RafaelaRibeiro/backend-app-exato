import {
  Controller,
  Post,
  HttpCode,
  Request,
  HttpStatus,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { UserAuthService } from './services/userAuth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userAuthService: UserAuthService,
  ) {}

  @Post('app')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  async authApp(@Request() req: any) {
    const user = await this.authService.validateUser(
      req.body.email,
      req.body.password,
      'app',
    );
    return this.authService.login(user);
  }

  @Post('portal')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  async authPortal(@Request() req: any) {
    const user = await this.authService.validateUser(
      req.body.email,
      req.body.password,
      'portal',
    );
    return this.authService.login(user);
  }

  @Get('user')
  @UseGuards(AuthGuard('jwt'))
  async authUser(@Request() req: any) {
    return this.userAuthService.authUser(req.user.id);
  }
}
