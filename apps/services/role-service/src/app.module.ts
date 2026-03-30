import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { RoleServiceDomainController } from './application/role.controller';
import { RoleServiceDomainService } from './application/role.service';

@Module({
  controllers: [HealthController, RoleServiceDomainController],
  providers: [RoleServiceDomainService],
})
export class AppModule {}
