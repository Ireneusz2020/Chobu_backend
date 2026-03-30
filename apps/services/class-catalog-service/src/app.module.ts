import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { ClassCatalogServiceDomainController } from './application/class-catalog.controller';
import { ClassCatalogServiceDomainService } from './application/class-catalog.service';

@Module({
  controllers: [HealthController, ClassCatalogServiceDomainController],
  providers: [ClassCatalogServiceDomainService],
})
export class AppModule {}
