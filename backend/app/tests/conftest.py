from contextlib import contextmanager
from typing import Generator

import pytest
from fastapi.testclient import TestClient

from app.db.base_class import Base
from app.db.session import SessionLocal
from app.main import app


@contextmanager
def session_scope():
    """Provide a transactional scope around a series of operations."""
    session = SessionLocal()
    try:
        yield session
        session.commit()
    except:
        session.rollback()
        raise
    finally:
        session.close()


def clear_tables():
    with session_scope() as conn:
        conn.execute("SET FOREIGN_KEY_CHECKS = 0;")
        print(Base.metadata.sorted_tables)
        for table in Base.metadata.sorted_tables:
            conn.execute(f"TRUNCATE {table.name};")
        conn.execute("SET FOREIGN_KEY_CHECKS = 1;")
        conn.commit()


@pytest.fixture(scope="function")
def db() -> Generator:
    s = SessionLocal()
    yield s
    s.close()


@pytest.fixture(scope="module")
def client() -> Generator:
    clear_tables()
    with TestClient(app) as c:
        yield c


# @pytest.fixture(scope="module")
# def superuser_token_headers(client: TestClient) -> Dict[str, str]:
#     return get_superuser_token_headers(client)


# @pytest.fixture(scope="module")
# def normal_user_token_headers(client: TestClient, db: Session) -> Dict[str, str]:
#     return authentication_token_from_email(
#         client=client, email=settings.EMAIL_TEST_USER, db=db
#     )
