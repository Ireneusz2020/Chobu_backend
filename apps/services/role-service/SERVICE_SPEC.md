# role-service

## Responsibility
Role definitions and assignment.

## Core REST endpoints
- GET /health
- GET /api/v1/roles
- GET /api/v1/roles/:id
- POST /api/v1/roles
- PATCH /api/v1/roles/:id

## Events
- Published: `role.changed.v1`
- Consumed: `identity.user.registered.v1`

## Security notes
- JWT auth and RBAC enforced through gateway and local guards.
- Audit event emitted on sensitive read/write.

> PL: Ten dokument opisuje kontrakt serwisu i punkty integracji.
