import { Injectable } from '@nestjs/common';
import { PaymentServiceDomainEntity } from '../domain/payment.entity';

@Injectable()
export class PaymentServiceDomainRepository {
  private readonly store = new Map<string, PaymentServiceDomainEntity>();

  upsert(entity: PaymentServiceDomainEntity): PaymentServiceDomainEntity {
    this.store.set(entity.id, entity);
    return entity;
  }

  findById(id: string): PaymentServiceDomainEntity | undefined {
    return this.store.get(id);
  }

  findAll(): PaymentServiceDomainEntity[] {
    return Array.from(this.store.values());
  }
}
