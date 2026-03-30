import { AsyncLocalStorage } from 'node:async_hooks';

export interface RequestContextState {
  correlationId: string;
  actorUserId?: string;
}

export const requestContext = new AsyncLocalStorage<RequestContextState>();
