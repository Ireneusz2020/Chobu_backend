from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.core.config import settings
from app.db.session import get_db
from app.models.models import User

bearer = HTTPBearer(auto_error=False)


def get_current_user(
    creds: HTTPAuthorizationCredentials = Depends(bearer),
    db: Session = Depends(get_db),
) -> User:
    if not creds:
        raise HTTPException(status_code=401, detail="Unauthorized")
    try:
        payload = jwt.decode(creds.credentials, settings.jwt_secret, algorithms=["HS256"])
    except JWTError as exc:
        raise HTTPException(status_code=401, detail="Invalid token") from exc
    user = db.scalar(select(User).where(User.id == payload.get("sub")))
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user


def require_roles(*roles):
    def checker(user: User = Depends(get_current_user)):
        role = user.role.value if hasattr(user.role, "value") else user.role
        if role not in roles:
            raise HTTPException(status_code=403, detail="Forbidden")
        return user

    return checker
