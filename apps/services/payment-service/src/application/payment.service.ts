import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { UpsertResourceDto } from './payment.dto';
import { PaymentServiceDomainEntity } from '../domain/payment.entity';

@Injectable()
export class PaymentServiceDomainService {
  private readonly resources = new Map<string, PaymentServiceDomainEntity>();

  list(): PaymentServiceDomainEntity[] {
    return Array.from(this.resources.values());
  }

  get(id: string): PaymentServiceDomainEntity {
    const entity = this.resources.get(id);
    if (!entity) throw new NotFoundException('Resource not found');
    return entity;
  }

  create(dto: UpsertResourceDto): PaymentServiceDomainEntity {
    const now = new Date();
    const entity = new PaymentServiceDomainEntity(randomUUID(), dto.name, dto.description ?? null, now, now, true);
    this.resources.set(entity.id, entity);
    return entity;
  }

  update(id: string, dto: UpsertResourceDto): PaymentServiceDomainEntity {
    const current = this.get(id);
    current.name = dto.name;
    current.description = dto.description ?? null;
    current.updatedAt = new Date();
    return current;
  }
}
