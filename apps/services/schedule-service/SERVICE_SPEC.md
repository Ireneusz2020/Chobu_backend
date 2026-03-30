# schedule-service

## Responsibility
Class sessions planning and lifecycle.

## Core REST endpoints
- GET /health
- GET /api/v1/schedules
- GET /api/v1/schedules/:id
- POST /api/v1/schedules
- PATCH /api/v1/schedules/:id

## Events
- Published: `schedule.changed.v1`
- Consumed: `identity.user.registered.v1`

## Security notes
- JWT auth and RBAC enforced through gateway and local guards.
- Audit event emitted on sensitive read/write.

> PL: Ten dokument opisuje kontrakt serwisu i punkty integracji.
