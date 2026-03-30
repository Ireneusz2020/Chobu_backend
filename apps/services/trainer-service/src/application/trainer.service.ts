import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { UpsertResourceDto } from './trainer.dto';
import { TrainerServiceDomainEntity } from '../domain/trainer.entity';

@Injectable()
export class TrainerServiceDomainService {
  private readonly resources = new Map<string, TrainerServiceDomainEntity>();

  list(): TrainerServiceDomainEntity[] {
    return Array.from(this.resources.values());
  }

  get(id: string): TrainerServiceDomainEntity {
    const entity = this.resources.get(id);
    if (!entity) throw new NotFoundException('Resource not found');
    return entity;
  }

  create(dto: UpsertResourceDto): TrainerServiceDomainEntity {
    const now = new Date();
    const entity = new TrainerServiceDomainEntity(randomUUID(), dto.name, dto.description ?? null, now, now, true);
    this.resources.set(entity.id, entity);
    return entity;
  }

  update(id: string, dto: UpsertResourceDto): TrainerServiceDomainEntity {
    const current = this.get(id);
    current.name = dto.name;
    current.description = dto.description ?? null;
    current.updatedAt = new Date();
    return current;
  }
}
