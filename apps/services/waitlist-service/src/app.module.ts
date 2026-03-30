import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { WaitlistServiceDomainController } from './application/waitlist.controller';
import { WaitlistServiceDomainService } from './application/waitlist.service';

@Module({
  controllers: [HealthController, WaitlistServiceDomainController],
  providers: [WaitlistServiceDomainService],
})
export class AppModule {}
