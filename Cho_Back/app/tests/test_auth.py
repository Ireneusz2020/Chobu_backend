from fastapi.testclient import TestClient
from app.main import app
from app.db.init_db import init_db


def test_register_login():
    init_db()
    client = TestClient(app)
    email = "user1@example.com"
    response = client.post("/api/v1/auth/register", json={"email": email, "password": "secret123", "role": "CLIENT"})
    assert response.status_code in (200, 400)
    login = client.post("/api/v1/auth/login", json={"email": email, "password": "secret123"})
    assert login.status_code == 200
    assert "access_token" in login.json()
