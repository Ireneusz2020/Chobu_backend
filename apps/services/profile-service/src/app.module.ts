import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { ProfileServiceDomainController } from './application/profile.controller';
import { ProfileServiceDomainService } from './application/profile.service';

@Module({
  controllers: [HealthController, ProfileServiceDomainController],
  providers: [ProfileServiceDomainService],
})
export class AppModule {}
