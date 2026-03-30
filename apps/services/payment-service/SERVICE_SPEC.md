# payment-service

## Responsibility
Payment processing state machine.

## Core REST endpoints
- GET /health
- GET /api/v1/payments
- GET /api/v1/payments/:id
- POST /api/v1/payments
- PATCH /api/v1/payments/:id

## Events
- Published: `payment.changed.v1`
- Consumed: `identity.user.registered.v1`

## Security notes
- JWT auth and RBAC enforced through gateway and local guards.
- Audit event emitted on sensitive read/write.

> PL: Ten dokument opisuje kontrakt serwisu i punkty integracji.
