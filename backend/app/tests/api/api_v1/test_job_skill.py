from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.core.config import settings
from app.tests.utils.job_skill import create_random_job_skill


def test_get_all_job_skills_non_existent(client: TestClient, db: Session) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/job_skill/all",
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Job and its skills not found"


def test_get_job_skill_by_id(client: TestClient, db: Session) -> None:
    job_skill = create_random_job_skill(db)
    response = client.get(
        f"{settings.API_V1_STR}/job_skill/{job_skill.job_id}",
    )
    assert response.status_code == 200
    content = response.json()
    assert content["job_id"] == job_skill.job_id
    assert content["skill_name"] == job_skill.skill_name


def test_get_job_skill_by_id_non_existent(client: TestClient, db: Session) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/job_skill/999999",
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Job and its skills not found"


def test_get_all_job_skills(client: TestClient, db: Session) -> None:
    job_skill = create_random_job_skill(db)
    response = client.get(
        f"{settings.API_V1_STR}/job_skill/all",
    )
    assert response.status_code == 200
    content = response.json()
    assert len(content) == 2
    assert content[1]["job_id"] == job_skill.job_id
    assert content[1]["skill_id"] == job_skill.skill_id


def test_create_job_skill(client: TestClient, db: Session) -> None:
    data = {"job_id": 123, "skill_id": 456}
    response = client.post(
        f"{settings.API_V1_STR}/job_skill",
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["job_id"] == data["job_id"]
    assert content["skill_id"] == data["skill_id"]
    assert "job_id" in content


def test_update_job_skill_by_id(client: TestClient, db: Session) -> None:
    job_skill = create_random_job_skill(db)
    data = {"job_id": 123, "skill_id": 456}
    assert job_skill.job_id != job_skill["job_id"]
    assert job_skill.skill_id != job_skill["skill_id"]
    response = client.put(
        f"{settings.API_V1_STR}/job_skill/{job_skill.job_id}&{job_skill.skill_id}",
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["job_id"] == job_skill.job_id
    assert content["skill_id"] == data["skill_id"]


def test_update_job_skill_by_id_non_existent(client: TestClient, db: Session) -> None:
    data = {"job_id": 123, "skill_id": 456}
    response = client.put(
        f"{settings.API_V1_STR}/job_skill/999999",
        json=data,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Job and its skills not found"


def test_delete_job_skill_by_id(client: TestClient, db: Session) -> None:
    job_skill = create_random_job_skill(db)
    response = client.delete(f"{settings.API_V1_STR}/job_skill/{job_skill.job_id}")
    assert response.status_code == 200
    content = response.json()
    assert content["job_id"] == job_skill.job_id
    assert content["skill_id"] == job_skill.skill_id


def test_delete_job_skill_by_id_non_existent(client: TestClient, db: Session) -> None:
    response = client.delete(f"{settings.API_V1_STR}/job_skill/999999")
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Job and its skills not found"
