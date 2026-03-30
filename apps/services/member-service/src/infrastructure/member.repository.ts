import { Injectable } from '@nestjs/common';
import { MemberServiceDomainEntity } from '../domain/member.entity';

@Injectable()
export class MemberServiceDomainRepository {
  private readonly store = new Map<string, MemberServiceDomainEntity>();

  upsert(entity: MemberServiceDomainEntity): MemberServiceDomainEntity {
    this.store.set(entity.id, entity);
    return entity;
  }

  findById(id: string): MemberServiceDomainEntity | undefined {
    return this.store.get(id);
  }

  findAll(): MemberServiceDomainEntity[] {
    return Array.from(this.store.values());
  }
}
