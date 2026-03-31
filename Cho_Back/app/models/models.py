import enum
import uuid
from datetime import date, datetime
from sqlalchemy import Boolean, Date, DateTime, Enum, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column
from app.db.session import Base


class UserRole(str, enum.Enum):
    ADMIN = "ADMIN"
    TRAINER = "TRAINER"
    CLIENT = "CLIENT"


class User(Base):
    __tablename__ = "users"
    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[UserRole] = mapped_column(Enum(UserRole), default=UserRole.CLIENT, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)


class UserProfile(Base):
    __tablename__ = "profiles"
    user_id: Mapped[str] = mapped_column(String, ForeignKey("users.id"), primary_key=True)
    first_name: Mapped[str] = mapped_column(String(100), default="")
    last_name: Mapped[str] = mapped_column(String(100), default="")
    date_of_birth: Mapped[date | None] = mapped_column(Date, nullable=True)
    phone: Mapped[str | None] = mapped_column(String(20), nullable=True)


class ClassType(Base):
    __tablename__ = "class_types"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), unique=True)


class ClassSession(Base):
    __tablename__ = "sessions"
    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    class_type_id: Mapped[int] = mapped_column(Integer, ForeignKey("class_types.id"))
    trainer_id: Mapped[str] = mapped_column(String, ForeignKey("users.id"))
    start_time: Mapped[datetime] = mapped_column(DateTime)
    end_time: Mapped[datetime] = mapped_column(DateTime)
    capacity: Mapped[int] = mapped_column(Integer, default=20)
    is_cancelled: Mapped[bool] = mapped_column(Boolean, default=False)


class Booking(Base):
    __tablename__ = "bookings"
    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id: Mapped[str] = mapped_column(String, ForeignKey("users.id"))
    session_id: Mapped[str] = mapped_column(String, ForeignKey("sessions.id"))
    status: Mapped[str] = mapped_column(String(20), default="BOOKED")


class Attendance(Base):
    __tablename__ = "attendance"
    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    booking_id: Mapped[str] = mapped_column(String, ForeignKey("bookings.id"))
    checked_in_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class Payment(Base):
    __tablename__ = "payments"
    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id: Mapped[str] = mapped_column(String, ForeignKey("users.id"))
    amount: Mapped[int] = mapped_column(Integer)
    currency: Mapped[str] = mapped_column(String(8), default="PLN")
    status: Mapped[str] = mapped_column(String(30), default="PENDING")


class RefreshToken(Base):
    __tablename__ = "refresh_tokens"
    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id: Mapped[str] = mapped_column(String, ForeignKey("users.id"), index=True)
    token_hash: Mapped[str] = mapped_column(String(255), unique=True)
    is_revoked: Mapped[bool] = mapped_column(Boolean, default=False)


class EventLog(Base):
    __tablename__ = "event_logs"
    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    event_type: Mapped[str] = mapped_column(String(64))
    payload: Mapped[str] = mapped_column(Text)
