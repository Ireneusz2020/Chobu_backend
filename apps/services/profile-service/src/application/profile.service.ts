import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { UpsertResourceDto } from './profile.dto';
import { ProfileServiceDomainEntity } from '../domain/profile.entity';

@Injectable()
export class ProfileServiceDomainService {
  private readonly resources = new Map<string, ProfileServiceDomainEntity>();

  list(): ProfileServiceDomainEntity[] {
    return Array.from(this.resources.values());
  }

  get(id: string): ProfileServiceDomainEntity {
    const entity = this.resources.get(id);
    if (!entity) throw new NotFoundException('Resource not found');
    return entity;
  }

  create(dto: UpsertResourceDto): ProfileServiceDomainEntity {
    const now = new Date();
    const entity = new ProfileServiceDomainEntity(randomUUID(), dto.name, dto.description ?? null, now, now, true);
    this.resources.set(entity.id, entity);
    return entity;
  }

  update(id: string, dto: UpsertResourceDto): ProfileServiceDomainEntity {
    const current = this.get(id);
    current.name = dto.name;
    current.description = dto.description ?? null;
    current.updatedAt = new Date();
    return current;
  }
}
