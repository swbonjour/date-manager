import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { AnalyticService } from '../analytic/analytic.service';

@Module({
  providers: [TaskService, AnalyticService],
  controllers: [TaskController],
})
export class TaskModule {}
