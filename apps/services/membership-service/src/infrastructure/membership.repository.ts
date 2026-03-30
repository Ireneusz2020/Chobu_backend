import { Injectable } from '@nestjs/common';
import { MembershipServiceDomainEntity } from '../domain/membership.entity';

@Injectable()
export class MembershipServiceDomainRepository {
  private readonly store = new Map<string, MembershipServiceDomainEntity>();

  upsert(entity: MembershipServiceDomainEntity): MembershipServiceDomainEntity {
    this.store.set(entity.id, entity);
    return entity;
  }

  findById(id: string): MembershipServiceDomainEntity | undefined {
    return this.store.get(id);
  }

  findAll(): MembershipServiceDomainEntity[] {
    return Array.from(this.store.values());
  }
}
