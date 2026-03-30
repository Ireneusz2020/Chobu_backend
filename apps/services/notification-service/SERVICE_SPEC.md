# notification-service

## Responsibility
Event-driven notification dispatch abstraction.

## Core REST endpoints
- GET /health
- GET /api/v1/notifications
- GET /api/v1/notifications/:id
- POST /api/v1/notifications
- PATCH /api/v1/notifications/:id

## Events
- Published: `notification.changed.v1`
- Consumed: `identity.user.registered.v1`

## Security notes
- JWT auth and RBAC enforced through gateway and local guards.
- Audit event emitted on sensitive read/write.

> PL: Ten dokument opisuje kontrakt serwisu i punkty integracji.
