import { Module } from '@nestjs/common';
import { AnalyticController } from './analytic.controller';
import { AnalyticService } from './analytic.service';

@Module({
  providers: [AnalyticService],
  controllers: [AnalyticController],
})
export class AnalyticModule {}
