import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { UpsertResourceDto } from './membership.dto';
import { MembershipServiceDomainEntity } from '../domain/membership.entity';

@Injectable()
export class MembershipServiceDomainService {
  private readonly resources = new Map<string, MembershipServiceDomainEntity>();

  list(): MembershipServiceDomainEntity[] {
    return Array.from(this.resources.values());
  }

  get(id: string): MembershipServiceDomainEntity {
    const entity = this.resources.get(id);
    if (!entity) throw new NotFoundException('Resource not found');
    return entity;
  }

  create(dto: UpsertResourceDto): MembershipServiceDomainEntity {
    const now = new Date();
    const entity = new MembershipServiceDomainEntity(randomUUID(), dto.name, dto.description ?? null, now, now, true);
    this.resources.set(entity.id, entity);
    return entity;
  }

  update(id: string, dto: UpsertResourceDto): MembershipServiceDomainEntity {
    const current = this.get(id);
    current.name = dto.name;
    current.description = dto.description ?? null;
    current.updatedAt = new Date();
    return current;
  }
}
