# member-service

## Responsibility
Member lifecycle and membership relation.

## Core REST endpoints
- GET /health
- GET /api/v1/members
- GET /api/v1/members/:id
- POST /api/v1/members
- PATCH /api/v1/members/:id

## Events
- Published: `member.changed.v1`
- Consumed: `identity.user.registered.v1`

## Security notes
- JWT auth and RBAC enforced through gateway and local guards.
- Audit event emitted on sensitive read/write.

> PL: Ten dokument opisuje kontrakt serwisu i punkty integracji.
