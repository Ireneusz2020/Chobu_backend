# Chobu Backend Monorepo

Production-oriented scaffold for 20 microservices (NestJS + PostgreSQL + RabbitMQ + Redis) with strict DB-per-service isolation.

## 1. Proposed tech stack and rationale
- **NestJS + TypeScript**: modular architecture, DI, validation, OpenAPI integration.
- **Prisma + PostgreSQL**: explicit schema control, typed client, migration workflow.
- **RabbitMQ** for async domain events and side effects.
- **Redis** for idempotency keys, refresh-token revocation, and lightweight caches.
- **Docker Compose** for local orchestration.

> PL: Wybrany stack jest spójny i wspiera rozwój produkcyjny oraz separację domen.

## 2. Monorepo structure
- `apps/services/*`: independent deployables (20 services).
- `packages/contracts`: API DTO and response contracts.
- `packages/events`: event names and envelopes.
- `packages/common`: request context, logger, shared middleware foundations.
- `packages/config`: env + OpenAPI builders.
- `infra/seeds`: initial seed SQL for roles and permissions.

## 3. Service-by-service specification
Each service has `SERVICE_SPEC.md` with responsibility, endpoints, events, security and relationships.

## 4. Shared contracts and event catalog
See `packages/events/src/event-catalog.ts` and `packages/contracts/src/api-contracts.ts`.

## 5. Database schema outline per service
Each service contains:
- `prisma/schema.prisma`
- `migrations/0001_init.sql`

## 6. REST API outline
Global prefix `/api/v1`; resource controllers generated per service and ready for extension with canonical paths.

## 7. Security and RBAC rules
- JWT access + refresh flow in `auth-service` extension point.
- Role + permission model in shared package and dedicated services.
- Correlation-id + structured logging + audit event hooks.

## 8. Event-driven flows
- Booking created/cancelled => notification + audit + waitlist promotion.
- Session cancelled => notification fan-out + booking state adjustments.
- Payment status changes => membership update + notification + audit.

## 9. Local development setup
```bash
pnpm install
docker compose up -d
pnpm -r dev
```

## 10. Code scaffolding examples
- Service bootstrap: `apps/services/*/src/main.ts`
- Domain/application/infrastructure split per service in `src/`.
- Booking race-condition policy: `apps/services/booking-service/src/application/booking-policy.md`.

## 11. Next implementation steps
1. Replace in-memory repositories with Prisma repositories.
2. Implement real auth/token issuance and revocation tables.
3. Add saga/process-manager for payment-membership reconciliation.
4. Add integration tests with Testcontainers and contract tests via Pact.

## Open architectural decisions
- RabbitMQ topic conventions (`domain.entity.action.vN`) finalization.
- Token revocation strategy (centralized vs local per service).
- Read-model strategy for gateway aggregation (BFF vs federated queries).

## Risks
- Cross-service eventual consistency around booking/attendance state transitions.
- Duplicate processing without idempotent consumers.
- Data privacy leakage if trainer read scopes are not enforced at query layer.

## MVP -> v2 -> v3
- **MVP**: auth, profiles, class catalog, schedule, booking, waitlist, attendance, membership, payment mock, notification mock, audit.
- **v2**: payment provider integration, resilient outbox/inbox, hardened RBAC policies, observability stack.
- **v3**: multi-tenant support, advanced pricing rules, recommendation/retention automations.
