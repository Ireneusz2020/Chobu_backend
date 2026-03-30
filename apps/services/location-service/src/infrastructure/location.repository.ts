import { Injectable } from '@nestjs/common';
import { LocationServiceDomainEntity } from '../domain/location.entity';

@Injectable()
export class LocationServiceDomainRepository {
  private readonly store = new Map<string, LocationServiceDomainEntity>();

  upsert(entity: LocationServiceDomainEntity): LocationServiceDomainEntity {
    this.store.set(entity.id, entity);
    return entity;
  }

  findById(id: string): LocationServiceDomainEntity | undefined {
    return this.store.get(id);
  }

  findAll(): LocationServiceDomainEntity[] {
    return Array.from(this.store.values());
  }
}
