import { Injectable } from '@nestjs/common';
import { RoleServiceDomainEntity } from '../domain/role.entity';

@Injectable()
export class RoleServiceDomainRepository {
  private readonly store = new Map<string, RoleServiceDomainEntity>();

  upsert(entity: RoleServiceDomainEntity): RoleServiceDomainEntity {
    this.store.set(entity.id, entity);
    return entity;
  }

  findById(id: string): RoleServiceDomainEntity | undefined {
    return this.store.get(id);
  }

  findAll(): RoleServiceDomainEntity[] {
    return Array.from(this.store.values());
  }
}
