import { Body, Controller, Get, Param } from '@nestjs/common';
import { AnalyticService } from './analytic.service';
import { AuthUser } from 'src/libs/decorators/user.decorator';
import { AuthTokenData } from 'src/libs/dto/auth.dto';
import {
  AnalyticScheduleBusyGetDto,
  AnalyticScheduleBusyGetResponse,
} from 'src/libs/dto/analytic.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('analytic')
export class AnalyticController {
  constructor(private readonly analyticService: AnalyticService) {}

  @Get('calculate-schedule-busy/:date')
  @ApiResponse({ type: AnalyticScheduleBusyGetResponse })
  async getScheduleBusyAnalytic(
    @Param() dto: AnalyticScheduleBusyGetDto,
    @AuthUser() user: AuthTokenData,
  ) {
    return await this.analyticService.getScheduleBusyAnalytic({
      user: user,
      date: dto.date,
    });
  }
}
