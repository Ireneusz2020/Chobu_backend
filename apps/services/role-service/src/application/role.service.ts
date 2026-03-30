import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { UpsertResourceDto } from './role.dto';
import { RoleServiceDomainEntity } from '../domain/role.entity';

@Injectable()
export class RoleServiceDomainService {
  private readonly resources = new Map<string, RoleServiceDomainEntity>();

  list(): RoleServiceDomainEntity[] {
    return Array.from(this.resources.values());
  }

  get(id: string): RoleServiceDomainEntity {
    const entity = this.resources.get(id);
    if (!entity) throw new NotFoundException('Resource not found');
    return entity;
  }

  create(dto: UpsertResourceDto): RoleServiceDomainEntity {
    const now = new Date();
    const entity = new RoleServiceDomainEntity(randomUUID(), dto.name, dto.description ?? null, now, now, true);
    this.resources.set(entity.id, entity);
    return entity;
  }

  update(id: string, dto: UpsertResourceDto): RoleServiceDomainEntity {
    const current = this.get(id);
    current.name = dto.name;
    current.description = dto.description ?? null;
    current.updatedAt = new Date();
    return current;
  }
}
