# waitlist-service

## Responsibility
Separate waitlist queue and promotion.

## Core REST endpoints
- GET /health
- GET /api/v1/waitlists
- GET /api/v1/waitlists/:id
- POST /api/v1/waitlists
- PATCH /api/v1/waitlists/:id

## Events
- Published: `waitlist.changed.v1`
- Consumed: `identity.user.registered.v1`

## Security notes
- JWT auth and RBAC enforced through gateway and local guards.
- Audit event emitted on sensitive read/write.

> PL: Ten dokument opisuje kontrakt serwisu i punkty integracji.
