from app.worker.consumer import send_mock_notification


def test_send_mock_notification():
    assert send_mock_notification("class.cancelled", {"session_id": "abc"}) == "SENT"
