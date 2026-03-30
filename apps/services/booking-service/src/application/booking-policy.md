# Booking concurrency policy

1. Use unique index on `(session_id, member_id)` for active bookings (`BOOKED`).
2. Wrap booking creation in serializable transaction.
3. Lock target session row with `SELECT ... FOR UPDATE`.
4. Use idempotency key (`memberId + sessionId + clientRequestId`) persisted in Redis (24h TTL).

> PL: Chronimy ostatnie miejsce przez blokadę w transakcji i klucz idempotencji.
