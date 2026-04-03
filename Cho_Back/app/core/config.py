from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "Cho_Back"
    jwt_secret: str = "change-me"
    access_token_exp_minutes: int = 30
    refresh_token_exp_minutes: int = 60 * 24 * 14
    database_url: str = "sqlite+pysqlite:///./cho_back.db"
    redis_url: str = "redis://localhost:6379/0"


settings = Settings()
