import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { AuditServiceDomainController } from './application/audit.controller';
import { AuditServiceDomainService } from './application/audit.service';

@Module({
  controllers: [HealthController, AuditServiceDomainController],
  providers: [AuditServiceDomainService],
})
export class AppModule {}
