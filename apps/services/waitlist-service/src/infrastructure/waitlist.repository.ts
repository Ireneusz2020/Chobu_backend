import { Injectable } from '@nestjs/common';
import { WaitlistServiceDomainEntity } from '../domain/waitlist.entity';

@Injectable()
export class WaitlistServiceDomainRepository {
  private readonly store = new Map<string, WaitlistServiceDomainEntity>();

  upsert(entity: WaitlistServiceDomainEntity): WaitlistServiceDomainEntity {
    this.store.set(entity.id, entity);
    return entity;
  }

  findById(id: string): WaitlistServiceDomainEntity | undefined {
    return this.store.get(id);
  }

  findAll(): WaitlistServiceDomainEntity[] {
    return Array.from(this.store.values());
  }
}
