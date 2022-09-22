from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.core.config import settings
from app.tests.utils.role import create_random_role


def test_get_all_roles_non_existent(client: TestClient, db: Session) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/role/all",
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Roles not found"


def test_get_role_by_id(client: TestClient, db: Session) -> None:
    role = create_random_role(db)
    response = client.get(
        f"{settings.API_V1_STR}/role/{role.role_id}",
    )
    assert response.status_code == 200
    content = response.json()
    assert content["role_id"] == role.role_id
    assert content["role_name"] == role.role_name


def test_get_role_by_id_non_existent(client: TestClient, db: Session) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/role/999999",
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Role not found"


def test_get_all_roles(client: TestClient, db: Session) -> None:
    role = create_random_role(db)
    response = client.get(
        f"{settings.API_V1_STR}/role/all",
    )
    assert response.status_code == 200
    content = response.json()
    assert len(content) == 2
    assert content[1]["role_id"] == role.role_id
    assert content[1]["role_name"] == role.role_name


def test_create_role(client: TestClient, db: Session) -> None:
    data = {"role_name": "Foo"}
    response = client.post(
        f"{settings.API_V1_STR}/role",
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["role_name"] == data["role_name"]
    assert "role_id" in content


def test_update_role_by_id(client: TestClient, db: Session) -> None:
    role = create_random_role(db)
    data = {"role_name": "Bar"}
    assert role.role_name != data["role_name"]
    response = client.put(
        f"{settings.API_V1_STR}/role/{role.role_id}",
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["role_id"] == role.role_id
    assert content["role_name"] == data["role_name"]


def test_update_role_by_id_non_existent(client: TestClient, db: Session) -> None:
    data = {"role_name": "Bar"}
    response = client.put(
        f"{settings.API_V1_STR}/role/999999",
        json=data,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Role not found"


def test_delete_role_by_id(client: TestClient, db: Session) -> None:
    role = create_random_role(db)
    response = client.delete(f"{settings.API_V1_STR}/role/{role.role_id}")
    assert response.status_code == 200
    content = response.json()
    assert content["role_id"] == role.role_id
    assert content["role_name"] == role.role_name


def test_delete_role_by_id_non_existent(client: TestClient, db: Session) -> None:
    response = client.delete(f"{settings.API_V1_STR}/role/999999")
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Role not found"
