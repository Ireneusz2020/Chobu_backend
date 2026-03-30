# class-catalog-service

## Responsibility
Class type dictionary and metadata.

## Core REST endpoints
- GET /health
- GET /api/v1/class-catalogs
- GET /api/v1/class-catalogs/:id
- POST /api/v1/class-catalogs
- PATCH /api/v1/class-catalogs/:id

## Events
- Published: `class-catalog.changed.v1`
- Consumed: `identity.user.registered.v1`

## Security notes
- JWT auth and RBAC enforced through gateway and local guards.
- Audit event emitted on sensitive read/write.

> PL: Ten dokument opisuje kontrakt serwisu i punkty integracji.
