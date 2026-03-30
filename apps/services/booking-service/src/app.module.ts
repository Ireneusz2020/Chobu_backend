import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { BookingServiceDomainController } from './application/booking.controller';
import { BookingServiceDomainService } from './application/booking.service';

@Module({
  controllers: [HealthController, BookingServiceDomainController],
  providers: [BookingServiceDomainService],
})
export class AppModule {}
