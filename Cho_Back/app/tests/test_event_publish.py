from unittest.mock import patch
from app.events.publisher import EventPublisher


def test_event_publish():
    with patch("app.events.publisher.Redis") as redis_mock:
        EventPublisher().publish("class.cancelled", {"session_id": "1"})
        redis_mock.from_url.return_value.publish.assert_called_once()
