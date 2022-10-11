from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.core.config import settings
from app.tests.utils.course import create_random_course
from app.tests.utils.learning_journey import create_random_learning_journey
from app.tests.utils.learning_journey_course import (
    create_random_learning_journey_course,
)


def test_get_all_learning_journey_course_non_existent(
    client: TestClient, db: Session
) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/learning_journey_course/all",
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Courses under learning journeys not found"


def test_get_learning_journey_course_by_id(client: TestClient, db: Session) -> None:
    learning_journey_course = create_random_learning_journey_course(db)
    response = client.get(
        f"{settings.API_V1_STR}/learning_journey_course/learning_journey_&_course/{learning_journey_course.lj_id}&{learning_journey_course.course_id}",
    )
    assert response.status_code == 200
    content = response.json()
    assert content["lj_id"] == learning_journey_course.lj_id
    assert content["course_id"] == learning_journey_course.course_id


def test_get_learning_journey_course_by_id_non_existent(
    client: TestClient, db: Session
) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/learning_journey_course/learning_journey_&_course/999999&999999",
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Course under learning journey not found"


def test_get_learning_journey_course_by_lj_id(client: TestClient, db: Session) -> None:
    learning_journey_course = create_random_learning_journey_course(db)
    response = client.get(
        f"{settings.API_V1_STR}/learning_journey_course/{learning_journey_course.lj_id}",
    )
    assert response.status_code == 200
    content = response.json()

    is_learning_journey_course_in_response = False
    for obj in content:
        if obj["lj_id"] == learning_journey_course.lj_id:
            is_learning_journey_course_in_response = True
            break
    assert is_learning_journey_course_in_response


def test_get_learning_journey_course_by_lj_id_non_existent(
    client: TestClient, db: Session
) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/learning_journey_course/999999",
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Courses under learning journey not found"


def test_get_all_learning_journey_course(client: TestClient, db: Session) -> None:
    learning_journey_course = create_random_learning_journey_course(db)
    response = client.get(
        f"{settings.API_V1_STR}/learning_journey_course/all",
    )
    assert response.status_code == 200
    content = response.json()
    assert len(content) == 3

    is_learning_journey_course_in_response = False
    for obj in content:
        if obj["lj_id"] == learning_journey_course.lj_id:
            assert obj["course_id"] == learning_journey_course.course_id
            is_learning_journey_course_in_response = True
            break
    assert is_learning_journey_course_in_response


def test_create_learning_journey_course(client: TestClient, db: Session) -> None:
    lj_id = create_random_learning_journey(db).lj_id
    course_id = create_random_course(db).course_id
    data = {"lj_id": lj_id, "course_id": course_id}

    response = client.post(
        f"{settings.API_V1_STR}/learning_journey_course",
        json=data,
    )

    content = response.json()
    assert response.status_code == 200
    assert content["lj_id"] == data["lj_id"]
    assert content["course_id"] == data["course_id"]
    assert "lj_id" in content
    assert "course_id" in content


def test_delete_learning_journey_course_by_id(client: TestClient, db: Session) -> None:
    learning_journey_course = create_random_learning_journey_course(db)
    response = client.delete(
        f"{settings.API_V1_STR}/learning_journey_course/courses/{learning_journey_course.lj_id}&{learning_journey_course.course_id}"
    )
    assert response.status_code == 200
    content = response.json()
    assert content["lj_id"] == learning_journey_course.lj_id
    assert content["course_id"] == learning_journey_course.course_id


def test_delete_learning_journey_course_by_id_non_existent(
    client: TestClient, db: Session
) -> None:
    response = client.delete(
        f"{settings.API_V1_STR}/learning_journey_course/courses/999999&999999"
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Combination of learning journey and course not found"


def test_delete_all_courses_in_learning_journey_course_by_id(
    client: TestClient, db: Session
) -> None:
    lj_id = create_random_learning_journey(db).lj_id

    for i in range(5):
        course_id = create_random_course(db).course_id
        data = {"lj_id": lj_id, "course_id": course_id}
        response = client.post(
            f"{settings.API_V1_STR}/learning_journey_course",
            json=data,
        )

    response = client.delete(
        f"{settings.API_V1_STR}/learning_journey_course/all/{lj_id}"
    )
    assert response.status_code == 200
    content = response.json()
    assert len(content) == 5

    is_learning_journey_course_in_response = False
    for obj in content:
        if obj["lj_id"] == lj_id:
            is_learning_journey_course_in_response = True
            break
    assert is_learning_journey_course_in_response


def test_delete_all_courses_in_learning_journey_course_by_id_non_existent(
    client: TestClient, db: Session
) -> None:
    lj_id = create_random_learning_journey(db).lj_id

    response = client.delete(
        f"{settings.API_V1_STR}/learning_journey_course/all/{lj_id}"
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "No courses in learning journey"
