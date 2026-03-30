import { Injectable } from '@nestjs/common';
import { ConsentServiceDomainEntity } from '../domain/consent.entity';

@Injectable()
export class ConsentServiceDomainRepository {
  private readonly store = new Map<string, ConsentServiceDomainEntity>();

  upsert(entity: ConsentServiceDomainEntity): ConsentServiceDomainEntity {
    this.store.set(entity.id, entity);
    return entity;
  }

  findById(id: string): ConsentServiceDomainEntity | undefined {
    return this.store.get(id);
  }

  findAll(): ConsentServiceDomainEntity[] {
    return Array.from(this.store.values());
  }
}
