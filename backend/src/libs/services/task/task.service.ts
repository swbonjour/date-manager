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
    const tasksInCurrentDay = await this.manager.findBy(TaskEntity, {
      user_id: dto.user_id,
      date: DateTime.fromISO(dto.date).toISODate()!,
    });

    let tasksInPreviousDay = await this.manager.findBy(TaskEntity, {
      user_id: dto.user_id,
      date: DateTime.fromISO(dto.date).minus({ day: 1 }).toISODate()!,
    });

    tasksInPreviousDay = tasksInPreviousDay.filter(
      (task) => task.start.getDate() !== task.finish.getDate(),
    );

    return [...tasksInCurrentDay, ...tasksInPreviousDay];
  }

  public async createTask(dto: TaskCreateDto): Promise<TaskDto> {
    const existingTasksByDate = await this.getTasksByDate({
      date: dto.date,
      user_id: dto.user_id,
    });

    let existingTasksNextDay: TaskEntity[] = [];

    const date = DateTime.fromISO(dto.date).startOf('day');
    const start = DateTime.fromISO(dto.start);
    const finish = DateTime.fromISO(dto.finish);

    if (start > finish) {
      existingTasksNextDay = await this.getTasksByDate({
        date: date.plus({ day: 1 }).toISODate()!,
        user_id: dto.user_id,
      });
    }

    let intersectingTask: TaskEntity | undefined;

    if (start <= finish) {
      intersectingTask = existingTasksByDate.find(
        (task) =>
          (start.valueOf() > task.start.valueOf() &&
            start.valueOf() < task.finish.valueOf()) ||
          (finish.valueOf() > task.start.valueOf() &&
            finish.valueOf() < task.finish.valueOf()) ||
          (start.valueOf() <= task.start.valueOf() &&
            finish.valueOf() >= task.finish.valueOf()),
      );
    } else {
      const finishInCurrentDay = DateTime.fromISO(dto.start).endOf('day');
      intersectingTask = existingTasksByDate.find(
        (task) =>
          (start.valueOf() > task.start.valueOf() &&
            start.valueOf() < task.finish.valueOf()) ||
          (finishInCurrentDay.valueOf() > task.start.valueOf() &&
            finishInCurrentDay.valueOf() < task.finish.valueOf()) ||
          (start.valueOf() <= task.start.valueOf() &&
            finishInCurrentDay.valueOf() >= task.finish.valueOf()),
      );

      if (!intersectingTask) {
        const startInNextDay = DateTime.fromISO(dto.finish)
          .plus({ day: 1 })
          .startOf('day');
        const finishInNextDay = DateTime.fromISO(dto.finish).plus({ day: 1 });
        intersectingTask = existingTasksNextDay.find(
          (task) =>
            (startInNextDay.valueOf() > task.start.valueOf() &&
              startInNextDay.valueOf() < task.finish.valueOf()) ||
            (finishInNextDay.valueOf() > task.start.valueOf() &&
              finishInNextDay.valueOf() < task.finish.valueOf()) ||
            (startInNextDay.valueOf() <= task.start.valueOf() &&
              finishInNextDay.valueOf() >= task.finish.valueOf()),
        );
      }
    }

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
      finish:
        start > finish ? finish.plus({ day: 1 }).toJSDate() : finish.toJSDate(),
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
