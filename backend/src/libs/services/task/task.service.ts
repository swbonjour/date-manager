import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import dayjs from 'dayjs';
import {
  TaskCreateDto,
  TaskDto,
  TaskGetByDateDto,
} from 'src/libs/dto/task.dto';
import { TaskEntity } from 'src/libs/entities/task.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(private readonly manager: EntityManager) {}

  public async getTasksByDate(dto: TaskGetByDateDto): Promise<TaskEntity[]> {
    return await this.manager.findBy(TaskEntity, {
      user_id: dto.user_id,
      date: dayjs(dto.date).startOf('D').toDate(),
    });
  }

  public async createTask(dto: TaskCreateDto): Promise<TaskDto> {
    const existingTasksByDate = await this.getTasksByDate({
      date: dto.date,
      user_id: dto.user_id,
    });

    console.log(existingTasksByDate, dto);

    const intersectingTask = existingTasksByDate.find(
      (task) =>
        (dto.start >= task.start && dto.start <= task.finish) ||
        (dto.finish >= task.start && dto.finish <= task.finish) ||
        (dto.start <= dto.start && dto.finish >= task.finish),
    );

    if (intersectingTask) {
      throw new HttpException(
        'The tasks are intersecting',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newTask: TaskDto = {
      _id: randomUUID(),
      label: dto.label,
      type: dto.type,
      date: dayjs(dto.date).startOf('D').toDate(),
      start: dayjs(dto.start).toDate(),
      finish: dayjs(dto.finish).toDate(),
      description: dto.description,
      user_id: dto.user_id,
    };

    try {
      await this.manager.insert(TaskEntity, newTask);

      return newTask;
    } catch (err) {
      throw new Error(err as string);
    }
  }
}
