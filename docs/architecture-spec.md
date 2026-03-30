# Chobu Backend - Service-by-Service Specification

> English technical naming, with short Polish support notes where useful.

## 1) api-gateway
- Responsibility: edge routing, auth verification, rate limits, correlation-id propagation.
- Main routes: pass-through `/api/v1/*` with service mapping.
- Publishes: `gateway.request.blocked.v1` (optional).
- Consumes: none required.

## 2) identity-service
- Entity: `Identity(id, email unique, status: ACTIVE|BLOCKED|DELETED|PENDING, createdAt, updatedAt, deletedAt?)`.
- REST:
  - `POST /api/v1/identities`
  - `GET /api/v1/identities/:id`
  - `PATCH /api/v1/identities/:id/status`
- Validation: email RFC-compliant, status enum.
- Events: publish `identity.user.registered.v1`, `identity.status.changed.v1`.

## 3) auth-service
- Commands: register, login, refresh, logout, logout-all, request/reset/change password, verify email, me.
- Password hashing: Argon2id.
- REST:
  - `POST /api/v1/auth/register`
  - `POST /api/v1/auth/login`
  - `POST /api/v1/auth/refresh`
  - `POST /api/v1/auth/logout`
  - `POST /api/v1/auth/logout-all`
  - `POST /api/v1/auth/request-password-reset`
  - `POST /api/v1/auth/reset-password`
  - `POST /api/v1/auth/change-password`
  - `POST /api/v1/auth/verify-email`
  - `GET /api/v1/auth/me`
- Events: consumes `identity.user.registered.v1`; publishes `auth.password.changed.v1`, `auth.user.logged-in.v1`.

## 4) account-service
- Entity: `Account(id, identityId, type CLIENT|TRAINER|ADMIN, status ACTIVE|SUSPENDED|CLOSED)`.
- REST: `/api/v1/accounts/*`.
- Events: `account.status.changed.v1`.

## 5) profile-service
- Entity: `Profile(identityId, firstName, lastName, dateOfBirth, phoneCountryCode, phoneNationalNumber, phoneE164)`.
- Validation:
  - Name: unicode letters + spaces/hyphen/apostrophe.
  - `dateOfBirth <= today`.
  - phone normalized to E.164.
- REST: `/api/v1/profiles/*`.

## 6) consent-service
- Entity: `Consent(identityId, type TERMS|PRIVACY|MARKETING_EMAIL|MARKETING_SMS, version, granted, grantedAt)`.
- REST: `/api/v1/consents/*`.
- Events: `consent.changed.v1`.

## 7) role-service
- Entity: `Role(id, code ADMIN|TRAINER|CLIENT)`.
- REST: `/api/v1/roles/*`.

## 8) permission-service
- Entity: `Permission(id, code, description)` + `RolePermission(roleId, permissionId)`.
- REST: `/api/v1/permissions/*`, `/api/v1/roles/:id/permissions`.
- Seed: baseline permissions included.

## 9) trainer-service
- Entity: `Trainer(id, identityId, bio, isActive, specializationClassTypeIds[])`.
- REST: `/api/v1/trainers/*`.

## 10) member-service
- Entity: `Member(id, identityId, status ACTIVE|INACTIVE|BLOCKED, joinedAt)`.
- REST: `/api/v1/members/*`.

## 11) class-catalog-service
- Entity: `ClassType(id, name, description, category, defaultDurationMinutes, active)`.
- REST: `/api/v1/class-types/*`.

## 12) schedule-service
- Entity: `ClassSession(id, classTypeId, trainerId, locationId, roomName, startTimeUTC, endTimeUTC, capacity, status, cancellationReason?)`.
- REST: `/api/v1/sessions/*` with filters `dateFrom,dateTo,trainerId,classTypeId,status`.
- Events: publish `schedule.session.cancelled.v1`, `schedule.session.created.v1`.

## 13) location-service
- Entity: `Location(id, name, addressLine1, city, postalCode, country, roomCatalog)`.
- REST: `/api/v1/locations/*`.

## 14) booking-service
- Entity: `Booking(id, sessionId, memberId, status BOOKED|CANCELLED|ATTENDED|NO_SHOW, createdAt)`.
- Critical protection:
  - unique active booking `(sessionId, memberId, status=BOOKED)`.
  - serializable transaction for last seat + row lock on session availability snapshot.
  - idempotency key header `Idempotency-Key` stored Redis 24h.
- REST: `/api/v1/bookings/*`.
- Events: `booking.created.v1`, `booking.cancelled.v1`.

## 15) waitlist-service
- Entity: `WaitlistEntry(id, sessionId, memberId, position, status WAITING|PROMOTED|REMOVED)`.
- REST: `/api/v1/waitlist/*`.
- Consumes `booking.cancelled.v1` -> promotes next member.

## 16) attendance-service
- Entity: `Attendance(id, bookingId, sessionId, memberId, checkInAt, usedMembershipCard)`.
- Policy: check-in only with booking in BOOKED state or explicit ADMIN override path.
- REST: `/api/v1/attendance/*`.

## 17) membership-service
- Entities:
  - `Membership(id, memberId, type MONTHLY|MULTISPORT|SINGLE_ENTRY|OTHER, status ACTIVE|EXPIRED|SUSPENDED, validFrom, validTo)`
  - `MembershipCard(id, membershipId, provider, maskedCardNumber)`
- REST: `/api/v1/memberships/*`.
- Events: `membership.expired.v1`, `membership.activated.v1`.

## 18) payment-service
- Entity: `Payment(id, memberId, membershipId?, amount, currency, status PENDING|PAID|FAILED|CANCELLED, paidAt?)`.
- REST: `/api/v1/payments/*`.
- Events: `payment.status.changed.v1`.

## 19) notification-service
- Entity: `Notification(id, channel, recipient, template, payload, status)`.
- Consumes:
  - `booking.created.v1`
  - `booking.cancelled.v1`
  - `schedule.session.cancelled.v1`
  - `payment.status.changed.v1`
  - `membership.expired.v1`
  - `identity.user.registered.v1`
- REST: `/api/v1/notifications/*`.

## 20) audit-service
- Entity: `AuditLog(id, actorUserId, action, resourceType, resourceId, metadata, createdAt)`.
- REST: `/api/v1/audit-logs/*`.
- Consumes domain events or direct adapter calls.

## Example payloads
```json
{
  "register": {
    "email": "client@example.com",
    "password": "StrongPass#2026",
    "firstName": "Jan",
    "lastName": "Kowalski"
  },
  "createSession": {
    "classTypeId": "uuid",
    "trainerId": "uuid",
    "locationId": "uuid",
    "roomName": "Tatami-A",
    "startTime": "2026-04-02T17:00:00Z",
    "endTime": "2026-04-02T18:00:00Z",
    "capacity": 20
  },
  "createBooking": {
    "sessionId": "uuid",
    "memberId": "uuid"
  }
}
```

## HTTP codes baseline
- `200/201` success
- `202` async accepted
- `204` delete/cancel without body
- `400` validation
- `401/403` auth/rbac
- `404` missing resource
- `409` conflict (duplicate booking, stale idempotency)
- `422` business invariant broken

## Cross-service relationships
- identity -> account/profile/role/member/trainer via `identityId`
- class-catalog, location, trainer feed schedule
- schedule + member + membership feed booking/attendance
- booking events feed waitlist, notification, audit
- payment events feed membership + notification + audit
