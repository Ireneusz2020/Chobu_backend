import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { UpsertResourceDto } from './permission.dto';
import { PermissionServiceDomainEntity } from '../domain/permission.entity';

@Injectable()
export class PermissionServiceDomainService {
  private readonly resources = new Map<string, PermissionServiceDomainEntity>();

  list(): PermissionServiceDomainEntity[] {
    return Array.from(this.resources.values());
  }

  get(id: string): PermissionServiceDomainEntity {
    const entity = this.resources.get(id);
    if (!entity) throw new NotFoundException('Resource not found');
    return entity;
  }

  create(dto: UpsertResourceDto): PermissionServiceDomainEntity {
    const now = new Date();
    const entity = new PermissionServiceDomainEntity(randomUUID(), dto.name, dto.description ?? null, now, now, true);
    this.resources.set(entity.id, entity);
    return entity;
  }

  update(id: string, dto: UpsertResourceDto): PermissionServiceDomainEntity {
    const current = this.get(id);
    current.name = dto.name;
    current.description = dto.description ?? null;
    current.updatedAt = new Date();
    return current;
  }
}
