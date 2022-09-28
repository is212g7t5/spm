from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.core.config import settings
from app.tests.utils.skill import create_random_skill


def test_get_all_skills_non_existent(client: TestClient, db: Session) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/skill/all",
    )
    print(response.json())
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Skills not found"


def test_get_skills_by_id(client: TestClient, db: Session) -> None:
    skill = create_random_skill(db)
    response = client.get(
        f"{settings.API_V1_STR}/skill/{skill.skill_id}",
    )
    assert response.status_code == 200
    content = response.json()
    assert content["skill_id"] == skill.skill_id
    assert content["skill_name"] == skill.skill_name
    assert content["skill_desc"] == skill.skill_desc
    assert content["is_active"] == skill.is_active


def test_get_skill_by_id_non_existent(client: TestClient, db: Session) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/skill/999999",
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Skill not found"


def test_get_all_skills(client: TestClient, db: Session) -> None:
    skill = create_random_skill(db)
    response = client.get(
        f"{settings.API_V1_STR}/skill/all",
    )
    assert response.status_code == 200
    content = response.json()
    assert len(content) == 2

    is_course_in_response = False
    for obj in content:
        if obj["skill_id"] == skill.skill_id:
            assert obj["skill_name"] == skill.skill_name
            assert obj["skill_desc"] == skill.skill_desc
            assert obj["is_active"] == skill.is_active
            is_course_in_response = True
            break
    assert is_course_in_response


def test_create_skill_no_desc(client: TestClient, db: Session) -> None:
    data = {"skill_name": "Foo"}
    response = client.post(
        f"{settings.API_V1_STR}/skill",
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["skill_name"] == data["skill_name"]
    assert content["skill_desc"] == None
    assert content["is_active"] == True
    assert "skill_id" in content


def test_create_skill_with_desc(client: TestClient, db: Session) -> None:
    data = {"skill_name": "Foo", "skill_desc": "Bar"}
    response = client.post(
        f"{settings.API_V1_STR}/skill",
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["skill_name"] == data["skill_name"]
    assert content["skill_desc"] == data["skill_desc"]
    assert content["is_active"] == True
    assert "skill_id" in content


def test_update_skill_by_id(client: TestClient, db: Session) -> None:
    skill = create_random_skill(db)
    data = {"skill_name": "Bar"}
    assert skill.skill_name != data["skill_name"]
    response = client.put(
        f"{settings.API_V1_STR}/skill/{skill.skill_id}",
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["skill_id"] == skill.skill_id
    assert content["skill_desc"] == skill.skill_desc
    assert content["is_active"] == skill.is_active
    assert content["skill_name"] == data["skill_name"]


def test_update_skill_by_id_non_existent(client: TestClient, db: Session) -> None:
    data = {"skill_name": "Bar"}
    response = client.put(
        f"{settings.API_V1_STR}/skill/999999",
        json=data,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Skill not found"


def test_delete_skill_by_id(client: TestClient, db: Session) -> None:
    skill = create_random_skill(db)
    response = client.delete(f"{settings.API_V1_STR}/skill/{skill.skill_id}")
    assert response.status_code == 200
    content = response.json()
    assert content["skill_id"] == skill.skill_id
    assert content["skill_name"] == skill.skill_name
    assert content["skill_desc"] == skill.skill_desc
    assert content["is_active"] == skill.is_active


def test_delete_skill_by_id_non_existent(client: TestClient, db: Session) -> None:
    response = client.delete(f"{settings.API_V1_STR}/skill/999999")
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Skill not found"
