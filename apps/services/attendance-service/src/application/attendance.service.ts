import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { UpsertResourceDto } from './attendance.dto';
import { AttendanceServiceDomainEntity } from '../domain/attendance.entity';

@Injectable()
export class AttendanceServiceDomainService {
  private readonly resources = new Map<string, AttendanceServiceDomainEntity>();

  list(): AttendanceServiceDomainEntity[] {
    return Array.from(this.resources.values());
  }

  get(id: string): AttendanceServiceDomainEntity {
    const entity = this.resources.get(id);
    if (!entity) throw new NotFoundException('Resource not found');
    return entity;
  }

  create(dto: UpsertResourceDto): AttendanceServiceDomainEntity {
    const now = new Date();
    const entity = new AttendanceServiceDomainEntity(randomUUID(), dto.name, dto.description ?? null, now, now, true);
    this.resources.set(entity.id, entity);
    return entity;
  }

  update(id: string, dto: UpsertResourceDto): AttendanceServiceDomainEntity {
    const current = this.get(id);
    current.name = dto.name;
    current.description = dto.description ?? null;
    current.updatedAt = new Date();
    return current;
  }
}
