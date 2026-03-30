# api-gateway

## Responsibility
Gateway routing, auth propagation, rate limiting.

## Core REST endpoints
- GET /health
- GET /api/v1/gateways
- GET /api/v1/gateways/:id
- POST /api/v1/gateways
- PATCH /api/v1/gateways/:id

## Events
- Published: `gateway.changed.v1`
- Consumed: `identity.user.registered.v1`

## Security notes
- JWT auth and RBAC enforced through gateway and local guards.
- Audit event emitted on sensitive read/write.

> PL: Ten dokument opisuje kontrakt serwisu i punkty integracji.
