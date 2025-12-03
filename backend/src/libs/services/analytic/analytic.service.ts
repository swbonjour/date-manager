import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import {
  AnalyticScheduleBusyDto,
  AnalyticScheduleBusyGetDto,
  AnalyticScheduleBusyGetResponse,
  AnalyticScheduleBusyResponseDto,
} from 'src/libs/dto/analytic.dto';
import { AnalyticEntity } from 'src/libs/entities/analytic.entity';
import { TaskEntity } from 'src/libs/entities/task.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class AnalyticService {
  constructor(private readonly manager: EntityManager) {}

  public async getScheduleBusyAnalytic(
    dto: AnalyticScheduleBusyGetDto,
  ): Promise<AnalyticScheduleBusyGetResponse> {
    const userAnalytic = await this.manager.findOne(AnalyticEntity, {
      where: {
        date: DateTime.fromISO(dto.date).startOf('day').toISODate()!,
        user_id: dto.user._id,
      },
    });

    return { schedule_busy_minutes: userAnalytic?.schedule_busy_minutes };
  }

  public async calculateScheduleBusyAnalytic(
    dto: AnalyticScheduleBusyDto,
  ): Promise<AnalyticScheduleBusyResponseDto | undefined> {
    const userTasks = await this.manager.find(TaskEntity, {
      where: {
        date: DateTime.fromISO(dto.date).startOf('day').toISODate()!,
        user_id: dto.user._id,
      },
    });

    if (!userTasks) {
      return;
    }

    let busyMinutes = 0;

    for (const task of userTasks) {
      const minutesDiff = DateTime.fromJSDate(task.finish).diff(
        DateTime.fromJSDate(task.start),
        'minute',
      );

      busyMinutes += minutesDiff.minutes;
    }

    await this.manager.upsert(
      AnalyticEntity,
      {
        user_id: dto.user._id,
        schedule_busy_minutes: busyMinutes,
        date: DateTime.fromISO(dto.date).startOf('day').toISODate()!,
      },
      { conflictPaths: ['user_id', 'date'] },
    );

    return {
      schedule_busy_minutes: busyMinutes,
      date: dto.date,
    };
  }
}
