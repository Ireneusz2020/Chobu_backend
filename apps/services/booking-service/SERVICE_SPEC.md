# booking-service

## Responsibility
Bookings lifecycle and idempotent booking creation.

## Core REST endpoints
- GET /health
- GET /api/v1/bookings
- GET /api/v1/bookings/:id
- POST /api/v1/bookings
- PATCH /api/v1/bookings/:id

## Events
- Published: `booking.changed.v1`
- Consumed: `identity.user.registered.v1`

## Security notes
- JWT auth and RBAC enforced through gateway and local guards.
- Audit event emitted on sensitive read/write.

> PL: Ten dokument opisuje kontrakt serwisu i punkty integracji.
