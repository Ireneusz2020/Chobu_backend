export enum RoleName {
  ADMIN = 'ADMIN',
  TRAINER = 'TRAINER',
  CLIENT = 'CLIENT',
}

export enum PermissionName {
  BookingCreate = 'booking:create',
  BookingCancel = 'booking:cancel',
  SessionRead = 'session:read',
  SessionWrite = 'session:write',
  AttendanceCheckIn = 'attendance:checkin',
  AuditRead = 'audit:read',
}
