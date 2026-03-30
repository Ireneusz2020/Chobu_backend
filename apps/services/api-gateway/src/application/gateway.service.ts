import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { UpsertResourceDto } from './gateway.dto';
import { ApiGatewayEntity } from '../domain/gateway.entity';

@Injectable()
export class ApiGatewayService {
  private readonly resources = new Map<string, ApiGatewayEntity>();

  list(): ApiGatewayEntity[] {
    return Array.from(this.resources.values());
  }

  get(id: string): ApiGatewayEntity {
    const entity = this.resources.get(id);
    if (!entity) throw new NotFoundException('Resource not found');
    return entity;
  }

  create(dto: UpsertResourceDto): ApiGatewayEntity {
    const now = new Date();
    const entity = new ApiGatewayEntity(randomUUID(), dto.name, dto.description ?? null, now, now, true);
    this.resources.set(entity.id, entity);
    return entity;
  }

  update(id: string, dto: UpsertResourceDto): ApiGatewayEntity {
    const current = this.get(id);
    current.name = dto.name;
    current.description = dto.description ?? null;
    current.updatedAt = new Date();
    return current;
  }
}
