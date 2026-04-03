# Cho_Back

Backend mikroserwisu szkoły sztuk walki Chobu.

## Stack
- FastAPI
- SQLAlchemy 2.x
- PostgreSQL
- Redis (cache + event bus)
- JWT access + refresh (rotation)

## Uruchomienie lokalne
```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Testy
```bash
pytest -q
```
