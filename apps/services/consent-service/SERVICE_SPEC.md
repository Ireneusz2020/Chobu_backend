# consent-service

## Responsibility
Consent versioning and legal acceptance records.

## Core REST endpoints
- GET /health
- GET /api/v1/consents
- GET /api/v1/consents/:id
- POST /api/v1/consents
- PATCH /api/v1/consents/:id

## Events
- Published: `consent.changed.v1`
- Consumed: `identity.user.registered.v1`

## Security notes
- JWT auth and RBAC enforced through gateway and local guards.
- Audit event emitted on sensitive read/write.

> PL: Ten dokument opisuje kontrakt serwisu i punkty integracji.
