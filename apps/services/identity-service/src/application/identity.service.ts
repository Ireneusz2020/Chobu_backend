import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { UpsertResourceDto } from './identity.dto';
import { IdentityServiceDomainEntity } from '../domain/identity.entity';

@Injectable()
export class IdentityServiceDomainService {
  private readonly resources = new Map<string, IdentityServiceDomainEntity>();

  list(): IdentityServiceDomainEntity[] {
    return Array.from(this.resources.values());
  }

  get(id: string): IdentityServiceDomainEntity {
    const entity = this.resources.get(id);
    if (!entity) throw new NotFoundException('Resource not found');
    return entity;
  }

  create(dto: UpsertResourceDto): IdentityServiceDomainEntity {
    const now = new Date();
    const entity = new IdentityServiceDomainEntity(randomUUID(), dto.name, dto.description ?? null, now, now, true);
    this.resources.set(entity.id, entity);
    return entity;
  }

  update(id: string, dto: UpsertResourceDto): IdentityServiceDomainEntity {
    const current = this.get(id);
    current.name = dto.name;
    current.description = dto.description ?? null;
    current.updatedAt = new Date();
    return current;
  }
}
