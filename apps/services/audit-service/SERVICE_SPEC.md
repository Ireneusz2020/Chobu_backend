# audit-service

## Responsibility
Sensitive action audit trail ingestion.

## Core REST endpoints
- GET /health
- GET /api/v1/audits
- GET /api/v1/audits/:id
- POST /api/v1/audits
- PATCH /api/v1/audits/:id

## Events
- Published: `audit.changed.v1`
- Consumed: `identity.user.registered.v1`

## Security notes
- JWT auth and RBAC enforced through gateway and local guards.
- Audit event emitted on sensitive read/write.

> PL: Ten dokument opisuje kontrakt serwisu i punkty integracji.
