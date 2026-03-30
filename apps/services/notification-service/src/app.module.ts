import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { NotificationServiceDomainController } from './application/notification.controller';
import { NotificationServiceDomainService } from './application/notification.service';

@Module({
  controllers: [HealthController, NotificationServiceDomainController],
  providers: [NotificationServiceDomainService],
})
export class AppModule {}
