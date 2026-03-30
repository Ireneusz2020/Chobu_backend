import { Injectable } from '@nestjs/common';
import { AuthServiceDomainEntity } from '../domain/auth.entity';

@Injectable()
export class AuthServiceDomainRepository {
  private readonly store = new Map<string, AuthServiceDomainEntity>();

  upsert(entity: AuthServiceDomainEntity): AuthServiceDomainEntity {
    this.store.set(entity.id, entity);
    return entity;
  }

  findById(id: string): AuthServiceDomainEntity | undefined {
    return this.store.get(id);
  }

  findAll(): AuthServiceDomainEntity[] {
    return Array.from(this.store.values());
  }
}
