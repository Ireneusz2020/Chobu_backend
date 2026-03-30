# location-service

## Responsibility
Physical locations and rooms.

## Core REST endpoints
- GET /health
- GET /api/v1/locations
- GET /api/v1/locations/:id
- POST /api/v1/locations
- PATCH /api/v1/locations/:id

## Events
- Published: `location.changed.v1`
- Consumed: `identity.user.registered.v1`

## Security notes
- JWT auth and RBAC enforced through gateway and local guards.
- Audit event emitted on sensitive read/write.

> PL: Ten dokument opisuje kontrakt serwisu i punkty integracji.
