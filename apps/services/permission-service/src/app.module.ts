import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { PermissionServiceDomainController } from './application/permission.controller';
import { PermissionServiceDomainService } from './application/permission.service';

@Module({
  controllers: [HealthController, PermissionServiceDomainController],
  providers: [PermissionServiceDomainService],
})
export class AppModule {}
