# profile-service

## Responsibility
Personal profile and phone normalization.

## Core REST endpoints
- GET /health
- GET /api/v1/profiles
- GET /api/v1/profiles/:id
- POST /api/v1/profiles
- PATCH /api/v1/profiles/:id

## Events
- Published: `profile.changed.v1`
- Consumed: `identity.user.registered.v1`

## Security notes
- JWT auth and RBAC enforced through gateway and local guards.
- Audit event emitted on sensitive read/write.

> PL: Ten dokument opisuje kontrakt serwisu i punkty integracji.
