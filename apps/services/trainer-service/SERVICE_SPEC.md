# trainer-service

## Responsibility
Trainer domain profile, specialization and activity.

## Core REST endpoints
- GET /health
- GET /api/v1/trainers
- GET /api/v1/trainers/:id
- POST /api/v1/trainers
- PATCH /api/v1/trainers/:id

## Events
- Published: `trainer.changed.v1`
- Consumed: `identity.user.registered.v1`

## Security notes
- JWT auth and RBAC enforced through gateway and local guards.
- Audit event emitted on sensitive read/write.

> PL: Ten dokument opisuje kontrakt serwisu i punkty integracji.
