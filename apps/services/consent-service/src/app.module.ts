import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { ConsentServiceDomainController } from './application/consent.controller';
import { ConsentServiceDomainService } from './application/consent.service';

@Module({
  controllers: [HealthController, ConsentServiceDomainController],
  providers: [ConsentServiceDomainService],
})
export class AppModule {}
