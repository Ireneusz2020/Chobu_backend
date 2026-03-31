from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = "sqlite+pysqlite:///./cho_info.db"
    redis_url: str = "redis://localhost:6379/0"


settings = Settings()
