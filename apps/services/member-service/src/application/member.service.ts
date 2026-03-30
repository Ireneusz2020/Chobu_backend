import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { UpsertResourceDto } from './member.dto';
import { MemberServiceDomainEntity } from '../domain/member.entity';

@Injectable()
export class MemberServiceDomainService {
  private readonly resources = new Map<string, MemberServiceDomainEntity>();

  list(): MemberServiceDomainEntity[] {
    return Array.from(this.resources.values());
  }

  get(id: string): MemberServiceDomainEntity {
    const entity = this.resources.get(id);
    if (!entity) throw new NotFoundException('Resource not found');
    return entity;
  }

  create(dto: UpsertResourceDto): MemberServiceDomainEntity {
    const now = new Date();
    const entity = new MemberServiceDomainEntity(randomUUID(), dto.name, dto.description ?? null, now, now, true);
    this.resources.set(entity.id, entity);
    return entity;
  }

  update(id: string, dto: UpsertResourceDto): MemberServiceDomainEntity {
    const current = this.get(id);
    current.name = dto.name;
    current.description = dto.description ?? null;
    current.updatedAt = new Date();
    return current;
  }
}
