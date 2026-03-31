from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.models import Attendance
from app.schemas.schemas import AttendanceIn

router = APIRouter(prefix="/attendance", tags=["attendance"])


@router.post("/check-in")
def check_in(payload: AttendanceIn, db: Session = Depends(get_db)):
    attendance = Attendance(booking_id=payload.booking_id)
    db.add(attendance)
    db.commit()
    db.refresh(attendance)
    return attendance
