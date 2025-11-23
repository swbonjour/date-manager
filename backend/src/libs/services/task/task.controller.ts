import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import {
  TaskCreateDto,
  TaskDto,
  TaskGetByDateDto,
} from 'src/libs/dto/task.dto';
import { ApiResponse } from '@nestjs/swagger';
import { AuthUser } from 'src/libs/decorators/user.decorator';
import { AuthTokenData } from 'src/libs/dto/auth.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/by-date')
  @ApiResponse({ type: TaskDto, isArray: true })
  async getTasksByDate(
    @Query() query: TaskGetByDateDto,
    @AuthUser() user: AuthTokenData,
  ) {
    return await this.taskService.getTasksByDate({
      ...query,
      user_id: user._id,
    });
  }

  @Post('/create')
  @ApiResponse({ type: TaskDto })
  async createTask(
    @Body() dto: TaskCreateDto,
    @AuthUser() user: AuthTokenData,
  ) {
    return await this.taskService.createTask({ ...dto, user_id: user._id });
  }
}
