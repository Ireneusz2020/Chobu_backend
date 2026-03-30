# account-service

## Responsibility
Business account lifecycle and type.

## Core REST endpoints
- GET /health
- GET /api/v1/accounts
- GET /api/v1/accounts/:id
- POST /api/v1/accounts
- PATCH /api/v1/accounts/:id

## Events
- Published: `account.changed.v1`
- Consumed: `identity.user.registered.v1`

## Security notes
- JWT auth and RBAC enforced through gateway and local guards.
- Audit event emitted on sensitive read/write.

> PL: Ten dokument opisuje kontrakt serwisu i punkty integracji.
