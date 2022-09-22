from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.core.config import settings
from app.tests.utils.job import create_random_job


def test_get_all_jobs_non_existent(client: TestClient, db: Session) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/job/all",
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Jobs not found"


def test_get_jobs_by_id(client: TestClient, db: Session) -> None:
    job = create_random_job(db)
    response = client.get(
        f"{settings.API_V1_STR}/job/{job.job_id}",
    )
    assert response.status_code == 200
    content = response.json()
    assert content["job_id"] == job.job_id
    assert content["job_name"] == job.job_name
    assert content["job_desc"] == job.job_desc
    assert content["is_active"] == job.is_active


def test_get_job_by_id_non_existent(client: TestClient, db: Session) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/job/999999",
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Job not found"


def test_get_all_jobs(client: TestClient, db: Session) -> None:
    job = create_random_job(db)
    response = client.get(
        f"{settings.API_V1_STR}/job/all",
    )
    assert response.status_code == 200
    content = response.json()
    assert len(content) == 2
    assert content[1]["job_id"] == job.job_id
    assert content[1]["job_name"] == job.job_name
    assert content[1]["job_desc"] == job.job_desc
    assert content[1]["is_active"] == job.is_active


def test_create_job_no_desc(client: TestClient, db: Session) -> None:
    data = {"job_name": "Foo", "job_desc": None}
    response = client.post(
        f"{settings.API_V1_STR}/job",
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["job_name"] == data["job_name"]
    assert content["job_desc"] == data["job_desc"]
    assert content["is_active"] == True
    assert "job_id" in content


def test_create_job_with_desc(client: TestClient, db: Session) -> None:
    data = {"job_name": "Foo", "job_desc": "Bar"}
    response = client.post(
        f"{settings.API_V1_STR}/job",
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["job_name"] == data["job_name"]
    assert content["job_desc"] == data["job_desc"]
    assert content["is_active"] == True
    assert "job_id" in content


def test_update_job_by_id(client: TestClient, db: Session) -> None:
    job = create_random_job(db)
    data = {"job_name": "Bar"}
    assert job.job_name != data["job_name"]
    response = client.put(
        f"{settings.API_V1_STR}/job/{job.job_id}",
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["job_id"] == job.job_id
    assert content["job_desc"] == job.job_desc
    assert content["is_active"] == job.is_active
    assert content["job_name"] == data["job_name"]


def test_update_job_by_id_non_existent(client: TestClient, db: Session) -> None:
    data = {"job_name": "Bar"}
    response = client.put(
        f"{settings.API_V1_STR}/job/999999",
        json=data,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Job not found"


def test_delete_job_by_id(client: TestClient, db: Session) -> None:
    job = create_random_job(db)
    response = client.delete(f"{settings.API_V1_STR}/job/{job.job_id}")
    assert response.status_code == 200
    content = response.json()
    assert content["job_id"] == job.job_id
    assert content["job_name"] == job.job_name
    assert content["job_desc"] == job.job_desc
    assert content["is_active"] == job.is_active


def test_delete_job_by_id_non_existent(client: TestClient, db: Session) -> None:
    response = client.delete(f"{settings.API_V1_STR}/job/999999")
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Job not found"
