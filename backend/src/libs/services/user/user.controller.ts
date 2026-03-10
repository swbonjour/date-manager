import { Controller, Get, Param, ParseUUIDPipe, Res } from '@nestjs/common';
import { GetAllUsersResponse, GetUserByIdResponse } from '../../dto/user.dto';
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

  @Get('profile-img')
  @ApiResponse({
    content: { 'image/*': { schema: { type: 'string', format: 'binary' } } },
  })
  async getProfileImg(@AuthUser() user: AuthTokenData, @Res() res: Response) {
    const fileData = await this.userService.getProfileImg({
      user_id: user._id,
    });

    if (!fileData.buffer.byteLength) {
      return res.send({});
    }

    res.setHeader('Content-Type', `image/${fileData.type}`);
    res.setHeader('Content-Length', fileData.buffer.byteLength);
    res.setHeader('Cache-Control', 'public, max-age=86400');

    return res.send(fileData.buffer);
  }

  @Get(':id')
  @ApiResponse({ type: GetUserByIdResponse })
  async getUserById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.userService.getUserById({ id: id });
  }
}
