import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { IdentityServiceDomainController } from './application/identity.controller';
import { IdentityServiceDomainService } from './application/identity.service';

@Module({
  controllers: [HealthController, IdentityServiceDomainController],
  providers: [IdentityServiceDomainService],
})
export class AppModule {}
