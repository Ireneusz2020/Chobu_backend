# identity-service

## Responsibility
Canonical user identity lifecycle and status.

## Core REST endpoints
- GET /health
- GET /api/v1/identitys
- GET /api/v1/identitys/:id
- POST /api/v1/identitys
- PATCH /api/v1/identitys/:id

## Events
- Published: `identity.changed.v1`
- Consumed: `identity.user.registered.v1`

## Security notes
- JWT auth and RBAC enforced through gateway and local guards.
- Audit event emitted on sensitive read/write.

> PL: Ten dokument opisuje kontrakt serwisu i punkty integracji.
