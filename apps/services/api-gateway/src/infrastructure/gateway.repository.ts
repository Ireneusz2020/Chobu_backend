import { Injectable } from '@nestjs/common';
import { ApiGatewayEntity } from '../domain/gateway.entity';

@Injectable()
export class ApiGatewayRepository {
  private readonly store = new Map<string, ApiGatewayEntity>();

  upsert(entity: ApiGatewayEntity): ApiGatewayEntity {
    this.store.set(entity.id, entity);
    return entity;
  }

  findById(id: string): ApiGatewayEntity | undefined {
    return this.store.get(id);
  }

  findAll(): ApiGatewayEntity[] {
    return Array.from(this.store.values());
  }
}
