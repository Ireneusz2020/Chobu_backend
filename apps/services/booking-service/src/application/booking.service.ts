import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { UpsertResourceDto } from './booking.dto';
import { BookingServiceDomainEntity } from '../domain/booking.entity';

@Injectable()
export class BookingServiceDomainService {
  private readonly resources = new Map<string, BookingServiceDomainEntity>();

  list(): BookingServiceDomainEntity[] {
    return Array.from(this.resources.values());
  }

  get(id: string): BookingServiceDomainEntity {
    const entity = this.resources.get(id);
    if (!entity) throw new NotFoundException('Resource not found');
    return entity;
  }

  create(dto: UpsertResourceDto): BookingServiceDomainEntity {
    const now = new Date();
    const entity = new BookingServiceDomainEntity(randomUUID(), dto.name, dto.description ?? null, now, now, true);
    this.resources.set(entity.id, entity);
    return entity;
  }

  update(id: string, dto: UpsertResourceDto): BookingServiceDomainEntity {
    const current = this.get(id);
    current.name = dto.name;
    current.description = dto.description ?? null;
    current.updatedAt = new Date();
    return current;
  }
}
