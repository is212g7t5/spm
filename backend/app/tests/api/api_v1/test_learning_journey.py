from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.core.config import settings
from app.tests.utils.staff import create_random_staff
from app.tests.utils.job import create_random_job
from app.tests.utils.learning_journey import create_random_learning_journey


def test_get_all_learning_journeys_non_existent(client: TestClient, db: Session) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/learning_journey/all",
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Learning journeys not found"


def test_get_learning_journey_by_id(client: TestClient, db: Session) -> None:
    learning_journey = create_random_learning_journey(db)
    response = client.get(
        f"{settings.API_V1_STR}/learning_journey/{learning_journey.lj_id}",
    )
    assert response.status_code == 200
    content = response.json()
    assert content["lj_id"] == learning_journey.lj_id
    assert content["staff_id"] == learning_journey.staff_id
    assert content["job_id"] == learning_journey.job_id


def test_get_learning_journey_by_id_non_existent(client: TestClient, db: Session) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/learning_journey/999999",
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Learning journey not found"


def test_get_learning_journey_by_staff_id(client: TestClient, db: Session) -> None:
    learning_journey = create_random_learning_journey(db)
    response = client.get(
        f"{settings.API_V1_STR}/learning_journey/Staff/{learning_journey.staff_id}",
    )
    assert response.status_code == 200
    content = response.json()

    is_learning_journey_in_response = False
    for obj in content:
        if obj["staff_id"] == learning_journey.staff_id:
            is_learning_journey_in_response = True
            break
    assert is_learning_journey_in_response


def test_get_learning_journey_by_staff_id_non_existent(client: TestClient, db: Session) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/learning_journey/Staff/999999",
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Learning journeys under this staff not found"


def test_get_learning_journey_by_staff_and_job_id(client: TestClient, db: Session) -> None:
    learning_journey = create_random_learning_journey(db)
    response = client.get(
        f"{settings.API_V1_STR}/learning_journey/Staff_and_Job/{learning_journey.staff_id}&{learning_journey.job_id}",
    )
    assert response.status_code == 200
    content = response.json()

    is_learning_journey_in_response = False
    for obj in content:
        if obj["staff_id"] == learning_journey.staff_id:
            assert obj["job_id"] == learning_journey.job_id
            is_learning_journey_in_response = True
            break
    assert is_learning_journey_in_response


def test_get_learning_journey_by_staff_and_job_id_non_existent(client: TestClient, db: Session) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/learning_journey/Staff_and_Job/999999&999999",
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Learning journeys under this staff and job not found"


def test_get_all_learning_journeys(client: TestClient, db: Session) -> None:
    learning_journey = create_random_learning_journey(db)
    response = client.get(
        f"{settings.API_V1_STR}/learning_journey/all",
    )
    assert response.status_code == 200
    content = response.json()
    assert len(content) == 4

    is_learning_journey_in_response = False
    for obj in content:
        if obj["lj_id"] == learning_journey.lj_id:
            assert obj["staff_id"] == learning_journey.staff_id
            assert obj["job_id"] == learning_journey.job_id
            is_learning_journey_in_response = True
            break
    assert is_learning_journey_in_response


def test_create_learning_journey(client: TestClient, db: Session) -> None:
    staff_id = create_random_staff(db).staff_id
    job_id = create_random_job(db).job_id
    data = {"staff_id": staff_id, "job_id": job_id}

    response = client.post(
        f"{settings.API_V1_STR}/learning_journey",
        json=data,
    )
    
    assert response.status_code == 200
    content = response.json()
    assert content["staff_id"] == data["staff_id"]
    assert content["job_id"] == data["job_id"]
    assert "lj_id" in content


def test_delete_learning_journey_by_id(client: TestClient, db: Session) -> None:
    learning_journey = create_random_learning_journey(db)
    response = client.delete(
        f"{settings.API_V1_STR}/learning_journey/{learning_journey.lj_id}"
    )
    assert response.status_code == 200
    content = response.json()
    assert content["lj_id"] == learning_journey.lj_id
    assert content["staff_id"] == learning_journey.staff_id
    assert content["job_id"] == learning_journey.job_id


def test_delete_learning_journey_by_id_non_existent(client: TestClient, db: Session) -> None:
    response = client.delete(
        f"{settings.API_V1_STR}/learning_journey/999999"
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Learning journey not found"