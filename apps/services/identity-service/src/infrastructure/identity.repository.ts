import { Injectable } from '@nestjs/common';
import { IdentityServiceDomainEntity } from '../domain/identity.entity';

@Injectable()
export class IdentityServiceDomainRepository {
  private readonly store = new Map<string, IdentityServiceDomainEntity>();

  upsert(entity: IdentityServiceDomainEntity): IdentityServiceDomainEntity {
    this.store.set(entity.id, entity);
    return entity;
  }

  findById(id: string): IdentityServiceDomainEntity | undefined {
    return this.store.get(id);
  }

  findAll(): IdentityServiceDomainEntity[] {
    return Array.from(this.store.values());
  }
}
