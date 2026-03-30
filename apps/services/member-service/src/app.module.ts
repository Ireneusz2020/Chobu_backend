import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { MemberServiceDomainController } from './application/member.controller';
import { MemberServiceDomainService } from './application/member.service';

@Module({
  controllers: [HealthController, MemberServiceDomainController],
  providers: [MemberServiceDomainService],
})
export class AppModule {}
