import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { ApiGatewayController } from './application/gateway.controller';
import { ApiGatewayService } from './application/gateway.service';

@Module({
  controllers: [HealthController, ApiGatewayController],
  providers: [ApiGatewayService],
})
export class AppModule {}
