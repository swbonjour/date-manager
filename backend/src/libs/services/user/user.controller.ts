import {
  Body,
  Controller,
  Get,
  Param,
  ParseFilePipeBuilder,
  ParseUUIDPipe,
  Put,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  GetAllUsersResponse,
  GetProfileImgDto,
  GetUserByIdResponse,
  UpdateUserImgDto,
} from '../../dto/user.dto';
import { ApiConsumes, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuthUser } from 'src/libs/decorators/user.decorator';
import { AuthTokenData } from 'src/libs/dto/auth.dto';
import type { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private configService: ConfigService,
  ) {}

  @Get('')
  @ApiResponse({ type: GetAllUsersResponse, isArray: true })
  async getAllUsers(): Promise<GetAllUsersResponse[]> {
    return await this.userService.getAllUsers();
  }

  @Get('profile-img')
  @ApiResponse({
    content: { 'image/*': { schema: { type: 'string', format: 'binary' } } },
  })
  async getProfileImg(
    @AuthUser() user: AuthTokenData,
    @Res() res: Response,
    @Query() dto: GetProfileImgDto,
  ) {
    const fileData = await this.userService.getProfileImg({
      user_id: dto.user_id,
      timestamp: dto.timestamp,
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

  @Put('update-img')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  async updateUserImg(
    @Body() dto: UpdateUserImgDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const validateFilePipe = new ParseFilePipeBuilder()
      .addMaxSizeValidator({
        maxSize: this.configService.get('file_size') || 0,
      })
      .addFileTypeValidator({ fileType: /(jpg|jpeg|png)$/ })
      .build({ fileIsRequired: false });
    const validateFile = (await validateFilePipe.transform(
      file,
    )) as Express.Multer.File;
    await this.userService.updateProfileImg({ ...dto, file: validateFile });
  }
}
