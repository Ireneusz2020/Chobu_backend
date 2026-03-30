import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { UpsertResourceDto } from './schedule.dto';
import { ScheduleServiceDomainEntity } from '../domain/schedule.entity';

@Injectable()
export class ScheduleServiceDomainService {
  private readonly resources = new Map<string, ScheduleServiceDomainEntity>();

  list(): ScheduleServiceDomainEntity[] {
    return Array.from(this.resources.values());
  }

  get(id: string): ScheduleServiceDomainEntity {
    const entity = this.resources.get(id);
    if (!entity) throw new NotFoundException('Resource not found');
    return entity;
  }

  create(dto: UpsertResourceDto): ScheduleServiceDomainEntity {
    const now = new Date();
    const entity = new ScheduleServiceDomainEntity(randomUUID(), dto.name, dto.description ?? null, now, now, true);
    this.resources.set(entity.id, entity);
    return entity;
  }

  update(id: string, dto: UpsertResourceDto): ScheduleServiceDomainEntity {
    const current = this.get(id);
    current.name = dto.name;
    current.description = dto.description ?? null;
    current.updatedAt = new Date();
    return current;
  }
}
