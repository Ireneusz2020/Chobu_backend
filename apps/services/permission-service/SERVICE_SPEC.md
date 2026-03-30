# permission-service

## Responsibility
Permission catalog and role-permission mapping.

## Core REST endpoints
- GET /health
- GET /api/v1/permissions
- GET /api/v1/permissions/:id
- POST /api/v1/permissions
- PATCH /api/v1/permissions/:id

## Events
- Published: `permission.changed.v1`
- Consumed: `identity.user.registered.v1`

## Security notes
- JWT auth and RBAC enforced through gateway and local guards.
- Audit event emitted on sensitive read/write.

> PL: Ten dokument opisuje kontrakt serwisu i punkty integracji.
