import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { AccountServiceDomainController } from './application/account.controller';
import { AccountServiceDomainService } from './application/account.service';

@Module({
  controllers: [HealthController, AccountServiceDomainController],
  providers: [AccountServiceDomainService],
})
export class AppModule {}
