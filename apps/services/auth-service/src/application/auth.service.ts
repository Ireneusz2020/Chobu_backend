import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { UpsertResourceDto } from './auth.dto';
import { AuthServiceDomainEntity } from '../domain/auth.entity';

@Injectable()
export class AuthServiceDomainService {
  private readonly resources = new Map<string, AuthServiceDomainEntity>();

  list(): AuthServiceDomainEntity[] {
    return Array.from(this.resources.values());
  }

  get(id: string): AuthServiceDomainEntity {
    const entity = this.resources.get(id);
    if (!entity) throw new NotFoundException('Resource not found');
    return entity;
  }

  create(dto: UpsertResourceDto): AuthServiceDomainEntity {
    const now = new Date();
    const entity = new AuthServiceDomainEntity(randomUUID(), dto.name, dto.description ?? null, now, now, true);
    this.resources.set(entity.id, entity);
    return entity;
  }

  update(id: string, dto: UpsertResourceDto): AuthServiceDomainEntity {
    const current = this.get(id);
    current.name = dto.name;
    current.description = dto.description ?? null;
    current.updatedAt = new Date();
    return current;
  }
}
