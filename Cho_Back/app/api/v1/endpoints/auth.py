import hashlib
from fastapi import APIRouter, Depends, HTTPException
from jose import jwt, JWTError
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.api.v1.deps import get_current_user
from app.core.config import settings
from app.db.session import get_db
from app.models.models import RefreshToken
from app.schemas.schemas import LoginIn, RegisterIn, TokenOut
from app.services.auth import login_user, register_user

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register")
def register(payload: RegisterIn, db: Session = Depends(get_db)):
    try:
        user = register_user(db, payload.email, payload.password, payload.role)
        return {"id": user.id, "email": user.email, "role": user.role}
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@router.post("/login", response_model=TokenOut)
def login(payload: LoginIn, db: Session = Depends(get_db)):
    try:
        access, refresh = login_user(db, payload.email, payload.password)
        return TokenOut(access_token=access, refresh_token=refresh)
    except ValueError as exc:
        raise HTTPException(status_code=401, detail=str(exc)) from exc


@router.post("/refresh", response_model=TokenOut)
def refresh(data: dict, db: Session = Depends(get_db)):
    token = data.get("refresh_token", "")
    token_hash = hashlib.sha256(token.encode()).hexdigest()
    row = db.scalar(select(RefreshToken).where(RefreshToken.token_hash == token_hash, RefreshToken.is_revoked.is_(False)))
    if not row:
        raise HTTPException(status_code=401, detail="Invalid refresh")
    try:
        payload = jwt.decode(token, settings.jwt_secret, algorithms=["HS256"])
    except JWTError as exc:
        raise HTTPException(status_code=401, detail="Invalid refresh") from exc
    row.is_revoked = True
    db.commit()
    access = jwt.encode({**payload, "type": "access"}, settings.jwt_secret, algorithm="HS256")
    new_refresh = jwt.encode({**payload, "type": "refresh"}, settings.jwt_secret, algorithm="HS256")
    db.add(RefreshToken(user_id=row.user_id, token_hash=hashlib.sha256(new_refresh.encode()).hexdigest()))
    db.commit()
    return TokenOut(access_token=access, refresh_token=new_refresh)


@router.post("/logout")
def logout(data: dict, db: Session = Depends(get_db)):
    token_hash = hashlib.sha256(data.get("refresh_token", "").encode()).hexdigest()
    row = db.scalar(select(RefreshToken).where(RefreshToken.token_hash == token_hash))
    if row:
        row.is_revoked = True
        db.commit()
    return {"status": "logged_out"}


@router.get("/me")
def me(user=Depends(get_current_user)):
    return {"id": user.id, "email": user.email, "role": user.role}
