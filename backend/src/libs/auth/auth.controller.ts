import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthSignInDto, AuthSignUpDto } from '../dto/auth.dto';
import { AuthService } from './auth.service';
import { Public } from '../decorators/auth-public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  async signUp(@Body() dto: AuthSignUpDto) {
    return await this.authService.signUp(dto);
  }

  @Public()
  @Get('signin')
  async signIn(@Query() dto: AuthSignInDto) {
    return await this.authService.signIn(dto);
  }

  @Get('who-am-i')
  whoAmI() {
    return true;
  }
}
