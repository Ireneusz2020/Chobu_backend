import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { UpsertResourceDto } from './audit.dto';
import { AuditServiceDomainEntity } from '../domain/audit.entity';

@Injectable()
export class AuditServiceDomainService {
  private readonly resources = new Map<string, AuditServiceDomainEntity>();

  list(): AuditServiceDomainEntity[] {
    return Array.from(this.resources.values());
  }

  get(id: string): AuditServiceDomainEntity {
    const entity = this.resources.get(id);
    if (!entity) throw new NotFoundException('Resource not found');
    return entity;
  }

  create(dto: UpsertResourceDto): AuditServiceDomainEntity {
    const now = new Date();
    const entity = new AuditServiceDomainEntity(randomUUID(), dto.name, dto.description ?? null, now, now, true);
    this.resources.set(entity.id, entity);
    return entity;
  }

  update(id: string, dto: UpsertResourceDto): AuditServiceDomainEntity {
    const current = this.get(id);
    current.name = dto.name;
    current.description = dto.description ?? null;
    current.updatedAt = new Date();
    return current;
  }
}
