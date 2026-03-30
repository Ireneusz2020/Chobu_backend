import { Injectable } from '@nestjs/common';
import { TrainerServiceDomainEntity } from '../domain/trainer.entity';

@Injectable()
export class TrainerServiceDomainRepository {
  private readonly store = new Map<string, TrainerServiceDomainEntity>();

  upsert(entity: TrainerServiceDomainEntity): TrainerServiceDomainEntity {
    this.store.set(entity.id, entity);
    return entity;
  }

  findById(id: string): TrainerServiceDomainEntity | undefined {
    return this.store.get(id);
  }

  findAll(): TrainerServiceDomainEntity[] {
    return Array.from(this.store.values());
  }
}
