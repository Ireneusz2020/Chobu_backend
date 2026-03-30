import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { UpsertResourceDto } from './waitlist.dto';
import { WaitlistServiceDomainEntity } from '../domain/waitlist.entity';

@Injectable()
export class WaitlistServiceDomainService {
  private readonly resources = new Map<string, WaitlistServiceDomainEntity>();

  list(): WaitlistServiceDomainEntity[] {
    return Array.from(this.resources.values());
  }

  get(id: string): WaitlistServiceDomainEntity {
    const entity = this.resources.get(id);
    if (!entity) throw new NotFoundException('Resource not found');
    return entity;
  }

  create(dto: UpsertResourceDto): WaitlistServiceDomainEntity {
    const now = new Date();
    const entity = new WaitlistServiceDomainEntity(randomUUID(), dto.name, dto.description ?? null, now, now, true);
    this.resources.set(entity.id, entity);
    return entity;
  }

  update(id: string, dto: UpsertResourceDto): WaitlistServiceDomainEntity {
    const current = this.get(id);
    current.name = dto.name;
    current.description = dto.description ?? null;
    current.updatedAt = new Date();
    return current;
  }
}
