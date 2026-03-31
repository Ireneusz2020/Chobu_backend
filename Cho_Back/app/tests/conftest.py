import os
os.environ["PYTHONPATH"] = "."

from app.db.init_db import init_db


def pytest_sessionstart(session):
    init_db()
