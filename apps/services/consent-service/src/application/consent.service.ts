import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { UpsertResourceDto } from './consent.dto';
import { ConsentServiceDomainEntity } from '../domain/consent.entity';

@Injectable()
export class ConsentServiceDomainService {
  private readonly resources = new Map<string, ConsentServiceDomainEntity>();

  list(): ConsentServiceDomainEntity[] {
    return Array.from(this.resources.values());
  }

  get(id: string): ConsentServiceDomainEntity {
    const entity = this.resources.get(id);
    if (!entity) throw new NotFoundException('Resource not found');
    return entity;
  }

  create(dto: UpsertResourceDto): ConsentServiceDomainEntity {
    const now = new Date();
    const entity = new ConsentServiceDomainEntity(randomUUID(), dto.name, dto.description ?? null, now, now, true);
    this.resources.set(entity.id, entity);
    return entity;
  }

  update(id: string, dto: UpsertResourceDto): ConsentServiceDomainEntity {
    const current = this.get(id);
    current.name = dto.name;
    current.description = dto.description ?? null;
    current.updatedAt = new Date();
    return current;
  }
}
