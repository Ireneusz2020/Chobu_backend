import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { ScheduleServiceDomainController } from './application/schedule.controller';
import { ScheduleServiceDomainService } from './application/schedule.service';

@Module({
  controllers: [HealthController, ScheduleServiceDomainController],
  providers: [ScheduleServiceDomainService],
})
export class AppModule {}
