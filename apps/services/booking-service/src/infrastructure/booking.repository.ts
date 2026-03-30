import { Injectable } from '@nestjs/common';
import { BookingServiceDomainEntity } from '../domain/booking.entity';

@Injectable()
export class BookingServiceDomainRepository {
  private readonly store = new Map<string, BookingServiceDomainEntity>();

  upsert(entity: BookingServiceDomainEntity): BookingServiceDomainEntity {
    this.store.set(entity.id, entity);
    return entity;
  }

  findById(id: string): BookingServiceDomainEntity | undefined {
    return this.store.get(id);
  }

  findAll(): BookingServiceDomainEntity[] {
    return Array.from(this.store.values());
  }
}
