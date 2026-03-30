export enum DomainEventName {
  UserRegistered = 'identity.user.registered.v1',
  BookingCreated = 'booking.created.v1',
  BookingCancelled = 'booking.cancelled.v1',
  ClassSessionCancelled = 'schedule.session.cancelled.v1',
  PaymentStatusChanged = 'payment.status.changed.v1',
  MembershipExpired = 'membership.expired.v1',
}

export interface DomainEvent<TPayload extends object = object> {
  eventName: DomainEventName | string;
  eventId: string;
  occurredAt: string;
  correlationId: string;
  causationId?: string;
  payload: TPayload;
}
