from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.api.v1.deps import get_current_user
from app.db.session import get_db
from app.models.models import Booking
from app.schemas.schemas import BookingIn

router = APIRouter(prefix="/bookings", tags=["bookings"])


@router.post("")
def create_booking(payload: BookingIn, db: Session = Depends(get_db), user=Depends(get_current_user)):
    booking = Booking(user_id=user.id, session_id=payload.session_id)
    db.add(booking)
    db.commit()
    db.refresh(booking)
    return booking


@router.post("/{booking_id}/cancel")
def cancel_booking(booking_id: str, db: Session = Depends(get_db), user=Depends(get_current_user)):
    booking = db.get(Booking, booking_id)
    if booking and booking.user_id == user.id:
        booking.status = "CANCELLED"
        db.commit()
    return {"status": "cancelled"}


@router.get("/me")
def my_bookings(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return db.scalars(select(Booking).where(Booking.user_id == user.id)).all()
