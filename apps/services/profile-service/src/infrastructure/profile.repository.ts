import { Injectable } from '@nestjs/common';
import { ProfileServiceDomainEntity } from '../domain/profile.entity';

@Injectable()
export class ProfileServiceDomainRepository {
  private readonly store = new Map<string, ProfileServiceDomainEntity>();

  upsert(entity: ProfileServiceDomainEntity): ProfileServiceDomainEntity {
    this.store.set(entity.id, entity);
    return entity;
  }

  findById(id: string): ProfileServiceDomainEntity | undefined {
    return this.store.get(id);
  }

  findAll(): ProfileServiceDomainEntity[] {
    return Array.from(this.store.values());
  }
}
