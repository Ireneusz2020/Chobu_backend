# membership-service

## Responsibility
Membership plans/cards validity and providers.

## Core REST endpoints
- GET /health
- GET /api/v1/memberships
- GET /api/v1/memberships/:id
- POST /api/v1/memberships
- PATCH /api/v1/memberships/:id

## Events
- Published: `membership.changed.v1`
- Consumed: `identity.user.registered.v1`

## Security notes
- JWT auth and RBAC enforced through gateway and local guards.
- Audit event emitted on sensitive read/write.

> PL: Ten dokument opisuje kontrakt serwisu i punkty integracji.
