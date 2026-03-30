import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TrainerServiceDomainController } from './application/trainer.controller';
import { TrainerServiceDomainService } from './application/trainer.service';

@Module({
  controllers: [HealthController, TrainerServiceDomainController],
  providers: [TrainerServiceDomainService],
})
export class AppModule {}
