# attendance-service

## Responsibility
Check-in and attendance history.

## Core REST endpoints
- GET /health
- GET /api/v1/attendances
- GET /api/v1/attendances/:id
- POST /api/v1/attendances
- PATCH /api/v1/attendances/:id

## Events
- Published: `attendance.changed.v1`
- Consumed: `identity.user.registered.v1`

## Security notes
- JWT auth and RBAC enforced through gateway and local guards.
- Audit event emitted on sensitive read/write.

> PL: Ten dokument opisuje kontrakt serwisu i punkty integracji.
