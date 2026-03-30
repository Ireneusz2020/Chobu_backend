import { Injectable } from '@nestjs/common';
import { AccountServiceDomainEntity } from '../domain/account.entity';

@Injectable()
export class AccountServiceDomainRepository {
  private readonly store = new Map<string, AccountServiceDomainEntity>();

  upsert(entity: AccountServiceDomainEntity): AccountServiceDomainEntity {
    this.store.set(entity.id, entity);
    return entity;
  }

  findById(id: string): AccountServiceDomainEntity | undefined {
    return this.store.get(id);
  }

  findAll(): AccountServiceDomainEntity[] {
    return Array.from(this.store.values());
  }
}
