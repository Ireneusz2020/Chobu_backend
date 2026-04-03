import json
from redis import Redis
from app.core.config import settings
from app.db.session import Base, SessionLocal, engine
from app.models.models import NotificationLog


def send_mock_notification(event_type: str, payload: dict) -> str:
    print(f"[MOCK_NOTIFY] {event_type}: {payload}")
    return "SENT"


def handle_event(message: str) -> None:
    db = SessionLocal()
    try:
        data = json.loads(message)
        status = send_mock_notification(data["event_type"], data["payload"])
        db.add(NotificationLog(event_type=data["event_type"], payload=json.dumps(data["payload"]), status=status))
        db.commit()
    finally:
        db.close()


def run() -> None:
    Base.metadata.create_all(bind=engine)
    client = Redis.from_url(settings.redis_url, decode_responses=True)
    pubsub = client.pubsub()
    pubsub.subscribe("chobu.events")
    for message in pubsub.listen():
        if message.get("type") == "message":
            handle_event(message["data"])


if __name__ == "__main__":
    run()
