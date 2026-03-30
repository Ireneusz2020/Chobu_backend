import { Injectable } from '@nestjs/common';
import { ScheduleServiceDomainEntity } from '../domain/schedule.entity';

@Injectable()
export class ScheduleServiceDomainRepository {
  private readonly store = new Map<string, ScheduleServiceDomainEntity>();

  upsert(entity: ScheduleServiceDomainEntity): ScheduleServiceDomainEntity {
    this.store.set(entity.id, entity);
    return entity;
  }

  findById(id: string): ScheduleServiceDomainEntity | undefined {
    return this.store.get(id);
  }

  findAll(): ScheduleServiceDomainEntity[] {
    return Array.from(this.store.values());
  }
}
