import { Injectable } from '@nestjs/common';
import { AuditServiceDomainEntity } from '../domain/audit.entity';

@Injectable()
export class AuditServiceDomainRepository {
  private readonly store = new Map<string, AuditServiceDomainEntity>();

  upsert(entity: AuditServiceDomainEntity): AuditServiceDomainEntity {
    this.store.set(entity.id, entity);
    return entity;
  }

  findById(id: string): AuditServiceDomainEntity | undefined {
    return this.store.get(id);
  }

  findAll(): AuditServiceDomainEntity[] {
    return Array.from(this.store.values());
  }
}
