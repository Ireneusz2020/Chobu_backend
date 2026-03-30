import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { UpsertResourceDto } from './class-catalog.dto';
import { ClassCatalogServiceDomainEntity } from '../domain/class-catalog.entity';

@Injectable()
export class ClassCatalogServiceDomainService {
  private readonly resources = new Map<string, ClassCatalogServiceDomainEntity>();

  list(): ClassCatalogServiceDomainEntity[] {
    return Array.from(this.resources.values());
  }

  get(id: string): ClassCatalogServiceDomainEntity {
    const entity = this.resources.get(id);
    if (!entity) throw new NotFoundException('Resource not found');
    return entity;
  }

  create(dto: UpsertResourceDto): ClassCatalogServiceDomainEntity {
    const now = new Date();
    const entity = new ClassCatalogServiceDomainEntity(randomUUID(), dto.name, dto.description ?? null, now, now, true);
    this.resources.set(entity.id, entity);
    return entity;
  }

  update(id: string, dto: UpsertResourceDto): ClassCatalogServiceDomainEntity {
    const current = this.get(id);
    current.name = dto.name;
    current.description = dto.description ?? null;
    current.updatedAt = new Date();
    return current;
  }
}
