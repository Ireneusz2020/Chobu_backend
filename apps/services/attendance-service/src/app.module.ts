import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { AttendanceServiceDomainController } from './application/attendance.controller';
import { AttendanceServiceDomainService } from './application/attendance.service';

@Module({
  controllers: [HealthController, AttendanceServiceDomainController],
  providers: [AttendanceServiceDomainService],
})
export class AppModule {}
