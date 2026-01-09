import {
  Body,
  Controller,
  Get,
  ParseFilePipeBuilder,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  AuthSignInBadRequestResponse,
  AuthSignInDto,
  AuthSignInResponse,
  AuthSignUpDto,
  AuthSignUpResponse,
} from '../../dto/auth.dto';
import { AuthService } from './auth.service';
import { Public } from '../../decorators/auth-public.decorator';
import {
  ApiBadRequestResponse,
  ApiConsumes,
  ApiResponse,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ConfigEnv } from 'src/config/conf-env';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService<ConfigEnv>,
  ) {}

  @Public()
  @ApiResponse({ type: AuthSignUpResponse })
  @Post('signup')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  async signUp(
    @Body() dto: AuthSignUpDto,
    @UploadedFile()
    file: Express.Multer.File,
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
    return await this.authService.signUp({ ...dto, file: validateFile });
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
