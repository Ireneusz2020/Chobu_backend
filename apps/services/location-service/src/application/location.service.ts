import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { UpsertResourceDto } from './location.dto';
import { LocationServiceDomainEntity } from '../domain/location.entity';

@Injectable()
export class LocationServiceDomainService {
  private readonly resources = new Map<string, LocationServiceDomainEntity>();

  list(): LocationServiceDomainEntity[] {
    return Array.from(this.resources.values());
  }

  get(id: string): LocationServiceDomainEntity {
    const entity = this.resources.get(id);
    if (!entity) throw new NotFoundException('Resource not found');
    return entity;
  }

  create(dto: UpsertResourceDto): LocationServiceDomainEntity {
    const now = new Date();
    const entity = new LocationServiceDomainEntity(randomUUID(), dto.name, dto.description ?? null, now, now, true);
    this.resources.set(entity.id, entity);
    return entity;
  }

  update(id: string, dto: UpsertResourceDto): LocationServiceDomainEntity {
    const current = this.get(id);
    current.name = dto.name;
    current.description = dto.description ?? null;
    current.updatedAt = new Date();
    return current;
  }
}
