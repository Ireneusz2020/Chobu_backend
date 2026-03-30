import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { UpsertResourceDto } from './notification.dto';
import { NotificationServiceDomainEntity } from '../domain/notification.entity';

@Injectable()
export class NotificationServiceDomainService {
  private readonly resources = new Map<string, NotificationServiceDomainEntity>();

  list(): NotificationServiceDomainEntity[] {
    return Array.from(this.resources.values());
  }

  get(id: string): NotificationServiceDomainEntity {
    const entity = this.resources.get(id);
    if (!entity) throw new NotFoundException('Resource not found');
    return entity;
  }

  create(dto: UpsertResourceDto): NotificationServiceDomainEntity {
    const now = new Date();
    const entity = new NotificationServiceDomainEntity(randomUUID(), dto.name, dto.description ?? null, now, now, true);
    this.resources.set(entity.id, entity);
    return entity;
  }

  update(id: string, dto: UpsertResourceDto): NotificationServiceDomainEntity {
    const current = this.get(id);
    current.name = dto.name;
    current.description = dto.description ?? null;
    current.updatedAt = new Date();
    return current;
  }
}
