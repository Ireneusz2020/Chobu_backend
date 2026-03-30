import { Injectable } from '@nestjs/common';
import { NotificationServiceDomainEntity } from '../domain/notification.entity';

@Injectable()
export class NotificationServiceDomainRepository {
  private readonly store = new Map<string, NotificationServiceDomainEntity>();

  upsert(entity: NotificationServiceDomainEntity): NotificationServiceDomainEntity {
    this.store.set(entity.id, entity);
    return entity;
  }

  findById(id: string): NotificationServiceDomainEntity | undefined {
    return this.store.get(id);
  }

  findAll(): NotificationServiceDomainEntity[] {
    return Array.from(this.store.values());
  }
}
