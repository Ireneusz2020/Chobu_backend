# auth-service

## Responsibility
Registration, login, token lifecycle, password reset.

## Core REST endpoints
- GET /health
- GET /api/v1/auths
- GET /api/v1/auths/:id
- POST /api/v1/auths
- PATCH /api/v1/auths/:id

## Events
- Published: `auth.changed.v1`
- Consumed: `identity.user.registered.v1`

## Security notes
- JWT auth and RBAC enforced through gateway and local guards.
- Audit event emitted on sensitive read/write.

> PL: Ten dokument opisuje kontrakt serwisu i punkty integracji.
