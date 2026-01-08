import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { DateTime } from 'luxon';
import {
  TaskCreateDto,
  TaskDeleteDto,
  TaskDto,
  TaskGetByDateDto,
  TaskUpdateDto,
} from 'src/libs/dto/task.dto';
import { TaskEntity } from 'src/libs/entities/task.entity';
import { EntityManager } from 'typeorm';
import { AnalyticService } from '../analytic/analytic.service';

@Injectable()
export class TaskService {
  constructor(
    private readonly manager: EntityManager,
    private readonly analyticService: AnalyticService,
  ) {}

  public async getTasksByDate(dto: TaskGetByDateDto): Promise<TaskEntity[]> {
    return await this.manager.findBy(TaskEntity, {
      user_id: dto.user_id,
      date: DateTime.fromISO(dto.date).startOf('day').toISODate()!,
    });
  }

  public async createTask(dto: TaskCreateDto): Promise<TaskDto> {
    const existingTasksByDate = await this.getTasksByDate({
      date: dto.date,
      user_id: dto.user_id,
    });

    const date = DateTime.fromISO(dto.date).startOf('day');
    const start = DateTime.fromISO(dto.start);
    const finish = DateTime.fromISO(dto.finish);

    const intersectingTask = existingTasksByDate.find(
      (task) =>
        (start.valueOf() > task.start.valueOf() &&
          start.valueOf() < task.finish.valueOf()) ||
        (finish.valueOf() > task.start.valueOf() &&
          finish.valueOf() < task.finish.valueOf()) ||
        (start.valueOf() <= task.start.valueOf() &&
          finish.valueOf() >= task.finish.valueOf()),
    );

    if (intersectingTask) {
      throw new HttpException(
        'The tasks are intersecting',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newTask: TaskEntity = {
      _id: randomUUID(),
      label: dto.label,
      type: dto.type,
      date: date.toISODate()!,
      start: start.toJSDate(),
      finish: finish.toJSDate(),
      description: dto.description,
      user_id: dto.user_id,
    };

    try {
      await this.manager.insert(TaskEntity, newTask);

      await this.analyticService.calculateScheduleBusyAnalytic({
        date: dto.date,
        user_id: dto.user_id,
      });

      return {
        ...newTask,
        date: newTask.date,
        start: newTask.start.toISOString(),
        finish: newTask.finish.toISOString(),
      };
    } catch (err) {
      throw new Error(err as string);
    }
  }

  public async updateTask(dto: TaskUpdateDto): Promise<TaskDto> {
    const existingTasksByDate = await this.getTasksByDate({
      date: dto.date,
      user_id: dto.user_id,
    });

    existingTasksByDate.splice(
      existingTasksByDate.findIndex((item) => item._id === dto._id),
      1,
    );

    const date = DateTime.fromISO(dto.date).startOf('day');
    const start = DateTime.fromISO(dto.start);
    const finish = DateTime.fromISO(dto.finish);

    const intersectingTask = existingTasksByDate.find(
      (task) =>
        (start.valueOf() > task.start.valueOf() &&
          start.valueOf() < task.finish.valueOf()) ||
        (finish.valueOf() > task.start.valueOf() &&
          finish.valueOf() < task.finish.valueOf()) ||
        (start.valueOf() <= task.start.valueOf() &&
          finish.valueOf() >= task.finish.valueOf()),
    );

    if (intersectingTask) {
      throw new HttpException(
        'The tasks are intersecting',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      await this.manager.update(
        TaskEntity,
        {
          _id: dto._id,
        },
        {
          label: dto.label,
          type: dto.type,
          date: date.toISODate()!,
          start: start.toJSDate(),
          finish: finish.toJSDate(),
          description: dto.description,
        },
      );

      const updatedTask = await this.manager.findOneOrFail(TaskEntity, {
        where: { _id: dto._id },
      });

      await this.analyticService.calculateScheduleBusyAnalytic({
        date: dto.date,
        user_id: dto.user_id,
      });

      return {
        ...updatedTask,
        date: updatedTask.date,
        start: updatedTask.start.toISOString(),
        finish: updatedTask.finish.toISOString(),
      };
    } catch (err) {
      throw new Error(err as string);
    }
  }

  public async deleteTask(dto: TaskDeleteDto) {
    await this.manager.delete(TaskEntity, {
      _id: dto._id,
    });
  }
}
