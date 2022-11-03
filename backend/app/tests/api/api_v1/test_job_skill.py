from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.core.config import settings
from app.tests.utils.job import create_random_job
from app.tests.utils.job_skill import create_random_job_skill
from app.tests.utils.skill import create_random_skill


def test_get_all_job_skill_non_existent(client: TestClient, db: Session) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/job_skill/all",
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Jobs and skills not found"


def test_get_job_skill_by_job_id(client: TestClient, db: Session) -> None:
    job_skill = create_random_job_skill(db)
    response = client.get(
        f"{settings.API_V1_STR}/job_skill/jobs/{job_skill.job_id}",
    )
    assert response.status_code == 200
    content = response.json()

    is_job_skill_in_response = False
    for obj in content:
        if obj["job_id"] == job_skill.job_id:
            is_job_skill_in_response = True
            break
    assert is_job_skill_in_response


def test_get_job_skill_by_skill_id(client: TestClient, db: Session) -> None:
    job_skill = create_random_job_skill(db)
    response = client.get(
        f"{settings.API_V1_STR}/job_skill/skills/{job_skill.skill_id}",
    )
    assert response.status_code == 200
    content = response.json()

    is_job_skill_in_response = False
    for obj in content:
        if obj["skill_id"] == job_skill.skill_id:
            is_job_skill_in_response = True
            break
    assert is_job_skill_in_response


def test_get_job_skill_by_job_id_non_existent(client: TestClient, db: Session) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/job_skill/jobs/999999",
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Skills under this job not found"


def test_get_job_skill_by_skill_id_non_existent(
    client: TestClient, db: Session
) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/job_skill/skills/999999",
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Jobs under this skill not found"


def test_get_all_job_skill(client: TestClient, db: Session) -> None:
    job_skill = create_random_job_skill(db)
    response = client.get(
        f"{settings.API_V1_STR}/job_skill/all",
    )
    assert response.status_code == 200
    content = response.json()
    assert len(content) == 3

    is_job_skill_in_response = False
    for obj in content:
        if obj["job_id"] == job_skill.job_id:
            assert obj["skill_id"] == job_skill.skill_id
            is_job_skill_in_response = True
            break
    assert is_job_skill_in_response


def test_create_job_skill(client: TestClient, db: Session) -> None:
    job_id = create_random_job(db).job_id
    skill_id = create_random_skill(db).skill_id
    data = {"job_id": int(job_id), "skill_id": int(skill_id)}

    response = client.post(
        f"{settings.API_V1_STR}/job_skill",
        json=data,
    )

    content = response.json()
    assert response.status_code == 200
    assert content["job_id"] == data["job_id"]
    assert content["skill_id"] == data["skill_id"]
    assert "job_id" in content


def test_delete_job_skill_by_id(client: TestClient, db: Session) -> None:
    job_skill = create_random_job_skill(db)
    response = client.delete(
        f"{settings.API_V1_STR}/job_skill/{job_skill.job_id}&{job_skill.skill_id}"
    )
    assert response.status_code == 200
    content = response.json()
    assert content["job_id"] == job_skill.job_id
    assert content["skill_id"] == job_skill.skill_id


def test_delete_job_skill_by_id_non_existent(client: TestClient, db: Session) -> None:
    job_skill = create_random_job_skill(db)
    response = client.delete(
        f"{settings.API_V1_STR}/job_skill/{job_skill.job_id}&999999"
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Combination of job and skill not found"


def test_delete_job_skill_by_job_id(client: TestClient, db: Session) -> None:
    job_skill = create_random_job_skill(db)
    response = client.delete(f"{settings.API_V1_STR}/job_skill/{job_skill.job_id}")
    assert response.status_code == 200
    content = response.json()

    is_job_skill_in_response = False
    for obj in content:
        if obj["job_id"] == job_skill.job_id:
            is_job_skill_in_response = True
            break
    assert is_job_skill_in_response


def test_delete_job_skill_by_job_id_non_existent(
    client: TestClient, db: Session
) -> None:
    create_random_job_skill(db)
    response = client.delete(f"{settings.API_V1_STR}/job_skill/999999")
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Skills under this job not found"
