from datetime import datetime, date
from pydantic import BaseModel, EmailStr


class RegisterIn(BaseModel):
    email: EmailStr
    password: str
    role: str = "CLIENT"


class LoginIn(BaseModel):
    email: EmailStr
    password: str


class TokenOut(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class SessionIn(BaseModel):
    class_type_id: int
    trainer_id: str
    start_time: datetime
    end_time: datetime
    capacity: int = 20


class SessionRescheduleIn(BaseModel):
    start_time: datetime
    end_time: datetime


class BookingIn(BaseModel):
    session_id: str


class AttendanceIn(BaseModel):
    booking_id: str


class ProfileOut(BaseModel):
    first_name: str = ""
    last_name: str = ""
    date_of_birth: date | None = None
    phone: str | None = None
