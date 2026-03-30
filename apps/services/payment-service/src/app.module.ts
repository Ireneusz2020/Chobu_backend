import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { PaymentServiceDomainController } from './application/payment.controller';
import { PaymentServiceDomainService } from './application/payment.service';

@Module({
  controllers: [HealthController, PaymentServiceDomainController],
  providers: [PaymentServiceDomainService],
})
export class AppModule {}
