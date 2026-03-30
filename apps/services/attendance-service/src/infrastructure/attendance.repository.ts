import { Injectable } from '@nestjs/common';
import { AttendanceServiceDomainEntity } from '../domain/attendance.entity';

@Injectable()
export class AttendanceServiceDomainRepository {
  private readonly store = new Map<string, AttendanceServiceDomainEntity>();

  upsert(entity: AttendanceServiceDomainEntity): AttendanceServiceDomainEntity {
    this.store.set(entity.id, entity);
    return entity;
  }

  findById(id: string): AttendanceServiceDomainEntity | undefined {
    return this.store.get(id);
  }

  findAll(): AttendanceServiceDomainEntity[] {
    return Array.from(this.store.values());
  }
}
