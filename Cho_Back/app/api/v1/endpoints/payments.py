from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.api.v1.deps import get_current_user
from app.db.session import get_db
from app.models.models import Payment

router = APIRouter(prefix="/payments", tags=["payments"])


@router.get("/me")
def my_payments(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return db.scalars(select(Payment).where(Payment.user_id == user.id)).all()
