import { Injectable } from '@nestjs/common';
import { ClassCatalogServiceDomainEntity } from '../domain/class-catalog.entity';

@Injectable()
export class ClassCatalogServiceDomainRepository {
  private readonly store = new Map<string, ClassCatalogServiceDomainEntity>();

  upsert(entity: ClassCatalogServiceDomainEntity): ClassCatalogServiceDomainEntity {
    this.store.set(entity.id, entity);
    return entity;
  }

  findById(id: string): ClassCatalogServiceDomainEntity | undefined {
    return this.store.get(id);
  }

  findAll(): ClassCatalogServiceDomainEntity[] {
    return Array.from(this.store.values());
  }
}
