import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { AuthServiceDomainController } from './application/auth.controller';
import { AuthServiceDomainService } from './application/auth.service';

@Module({
  controllers: [HealthController, AuthServiceDomainController],
  providers: [AuthServiceDomainService],
})
export class AppModule {}
