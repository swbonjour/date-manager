import { Controller, Get, Res } from '@nestjs/common';
import { GetAllUsersResponse, GetProfileImgResponse } from '../../dto/user.dto';
import { ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuthUser } from 'src/libs/decorators/user.decorator';
import { AuthTokenData } from 'src/libs/dto/auth.dto';
import type { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @ApiResponse({ type: GetAllUsersResponse, isArray: true })
  async getAllUsers(): Promise<GetAllUsersResponse[]> {
    return await this.userService.getAllUsers();
  }

  @Get('img')
  @ApiResponse({
    content: { 'image/*': { schema: { type: 'string', format: 'binary' } } },
  })
  async getProfileImg(@AuthUser() user: AuthTokenData, @Res() res: Response) {
    const buffer = await this.userService.getProfileImg({ user_id: user._id });

    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Length', buffer?.byteLength || 0);
    res.setHeader('Cache-Control', 'public, max-age=86400');

    return res.send(buffer);
  }
}
