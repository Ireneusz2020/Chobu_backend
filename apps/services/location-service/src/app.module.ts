import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { LocationServiceDomainController } from './application/location.controller';
import { LocationServiceDomainService } from './application/location.service';

@Module({
  controllers: [HealthController, LocationServiceDomainController],
  providers: [LocationServiceDomainService],
})
export class AppModule {}
