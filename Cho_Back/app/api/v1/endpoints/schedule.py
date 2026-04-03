from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.api.v1.deps import require_roles
from app.db.session import get_db
from app.events.publisher import EventPublisher
from app.models.models import ClassSession
from app.schemas.schemas import SessionIn, SessionRescheduleIn

router = APIRouter(prefix="/sessions", tags=["sessions"])


@router.get("")
def list_sessions(db: Session = Depends(get_db)):
    return db.scalars(select(ClassSession)).all()


@router.post("")
def create_session(payload: SessionIn, db: Session = Depends(get_db), _=Depends(require_roles("ADMIN", "TRAINER"))):
    entity = ClassSession(**payload.model_dump())
    db.add(entity)
    db.commit()
    db.refresh(entity)
    return entity


@router.put("/{session_id}")
def update_session(session_id: str, payload: SessionIn, db: Session = Depends(get_db), _=Depends(require_roles("ADMIN", "TRAINER"))):
    entity = db.get(ClassSession, session_id)
    for k, v in payload.model_dump().items():
        setattr(entity, k, v)
    db.commit()
    return entity


@router.post("/{session_id}/cancel")
def cancel_session(session_id: str, db: Session = Depends(get_db), _=Depends(require_roles("ADMIN", "TRAINER"))):
    entity = db.get(ClassSession, session_id)
    entity.is_cancelled = True
    db.commit()
    EventPublisher().publish("class.cancelled", {"session_id": session_id})
    return {"status": "cancelled"}


@router.post("/{session_id}/reschedule")
def reschedule_session(session_id: str, payload: SessionRescheduleIn, db: Session = Depends(get_db), _=Depends(require_roles("ADMIN", "TRAINER"))):
    entity = db.get(ClassSession, session_id)
    entity.start_time = payload.start_time
    entity.end_time = payload.end_time
    db.commit()
    EventPublisher().publish("class.rescheduled", {"session_id": session_id, **payload.model_dump(mode="json")})
    return {"status": "rescheduled"}
