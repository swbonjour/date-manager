import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  AuthSignInBadRequestResponse,
  AuthSignInDto,
  AuthSignInResponse,
  AuthSignUpDto,
  AuthSignUpResponse,
} from '../dto/auth.dto';
import { AuthService } from './auth.service';
import { Public } from '../decorators/auth-public.decorator';
import { ApiBadRequestResponse, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiResponse({ type: AuthSignUpResponse })
  @Post('signup')
  async signUp(@Body() dto: AuthSignUpDto) {
    return await this.authService.signUp(dto);
  }

  @Public()
  @ApiResponse({ type: AuthSignInResponse })
  @ApiBadRequestResponse({ type: AuthSignInBadRequestResponse })
  @Get('signin')
  async signIn(@Query() dto: AuthSignInDto) {
    return await this.authService.signIn(dto);
  }

  @Get('who-am-i')
  whoAmI() {
    return true;
  }
}
