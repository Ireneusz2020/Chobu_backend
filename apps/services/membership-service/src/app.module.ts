import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { MembershipServiceDomainController } from './application/membership.controller';
import { MembershipServiceDomainService } from './application/membership.service';

@Module({
  controllers: [HealthController, MembershipServiceDomainController],
  providers: [MembershipServiceDomainService],
})
export class AppModule {}
