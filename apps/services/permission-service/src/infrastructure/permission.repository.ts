import { Injectable } from '@nestjs/common';
import { PermissionServiceDomainEntity } from '../domain/permission.entity';

@Injectable()
export class PermissionServiceDomainRepository {
  private readonly store = new Map<string, PermissionServiceDomainEntity>();

  upsert(entity: PermissionServiceDomainEntity): PermissionServiceDomainEntity {
    this.store.set(entity.id, entity);
    return entity;
  }

  findById(id: string): PermissionServiceDomainEntity | undefined {
    return this.store.get(id);
  }

  findAll(): PermissionServiceDomainEntity[] {
    return Array.from(this.store.values());
  }
}
