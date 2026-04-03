import json
from redis import Redis
from app.core.config import settings


class EventPublisher:
    def __init__(self) -> None:
        self.client = Redis.from_url(settings.redis_url, decode_responses=True)

    def publish(self, event_type: str, payload: dict) -> None:
        self.client.publish("chobu.events", json.dumps({"event_type": event_type, "payload": payload}))
