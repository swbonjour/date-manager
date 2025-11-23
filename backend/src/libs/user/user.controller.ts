import { Controller, Get } from '@nestjs/common';
import { GetAllUsersResponse } from '../dto/user.dto';
import { ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @ApiResponse({ type: GetAllUsersResponse, isArray: true })
  async getAllUsers(): Promise<GetAllUsersResponse[]> {
    return await this.userService.getAllUsers();
  }
}
