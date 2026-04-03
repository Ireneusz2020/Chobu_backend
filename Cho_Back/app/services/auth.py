import hashlib
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.core.security import create_token, hash_password, verify_password
from app.models.models import RefreshToken, User
from app.core.config import settings


def register_user(db: Session, email: str, password: str, role: str) -> User:
    existing = db.scalar(select(User).where(User.email == email))
    if existing:
        raise ValueError("Email already exists")
    user = User(email=email, password_hash=hash_password(password), role=role)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def login_user(db: Session, email: str, password: str) -> tuple[str, str]:
    user = db.scalar(select(User).where(User.email == email))
    if not user or not verify_password(password, user.password_hash):
        raise ValueError("Invalid credentials")
    access = create_token(user.id, user.role.value if hasattr(user.role, "value") else user.role, settings.access_token_exp_minutes, "access")
    refresh = create_token(user.id, user.role.value if hasattr(user.role, "value") else user.role, settings.refresh_token_exp_minutes, "refresh")
    token_hash = hashlib.sha256(refresh.encode()).hexdigest()
    db.add(RefreshToken(user_id=user.id, token_hash=token_hash))
    db.commit()
    return access, refresh
