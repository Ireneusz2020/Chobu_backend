import uuid
from sqlalchemy import String, Text
from sqlalchemy.orm import Mapped, mapped_column
from app.db.session import Base


class NotificationLog(Base):
    __tablename__ = "notifications"
    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id: Mapped[str | None] = mapped_column(String, nullable=True)
    event_type: Mapped[str] = mapped_column(String(64))
    payload: Mapped[str] = mapped_column(Text)
    status: Mapped[str] = mapped_column(String(32), default="SENT")
