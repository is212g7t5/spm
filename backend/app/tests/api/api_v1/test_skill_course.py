from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.core.config import settings
from app.tests.utils.course import create_random_course
from app.tests.utils.skill import create_random_skill
from app.tests.utils.skill_course import create_random_skill_course


def test_get_all_skill_course_non_existent(client: TestClient, db: Session) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/skill_course/all",
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Skills and courses not found"


def test_get_skill_course_by_skill_id(client: TestClient, db: Session) -> None:
    skill_course = create_random_skill_course(db)
    response = client.get(
        f"{settings.API_V1_STR}/skill_course/skills/{skill_course.skill_id}",
    )
    assert response.status_code == 200
    content = response.json()

    is_skill_course_in_response = False
    for obj in content:
        if obj["skill_id"] == skill_course.skill_id:
            is_skill_course_in_response = True
            break
    assert is_skill_course_in_response


def test_get_skill_course_by_course_id(client: TestClient, db: Session) -> None:
    skill_course = create_random_skill_course(db)
    response = client.get(
        f"{settings.API_V1_STR}/skill_course/courses/{skill_course.course_id}",
    )
    assert response.status_code == 200
    content = response.json()

    is_skill_course_in_response = False
    for obj in content:
        if obj["course_id"] == skill_course.course_id:
            is_skill_course_in_response = True
            break
    assert is_skill_course_in_response


def test_get_skill_course_by_skill_id_non_existent(
    client: TestClient, db: Session
) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/skill_course/skills/999999",
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Courses under this skill not found"


def test_get_skill_course_by_course_id_non_existent(
    client: TestClient, db: Session
) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/skill_course/courses/999999",
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Skills under this course not found"


def test_get_all_skill_course(client: TestClient, db: Session) -> None:
    skill_course = create_random_skill_course(db)
    response = client.get(
        f"{settings.API_V1_STR}/skill_course/all",
    )
    assert response.status_code == 200
    content = response.json()
    assert len(content) == 3

    is_skill_course_in_response = False
    for obj in content:
        if obj["skill_id"] == skill_course.skill_id:
            assert obj["course_id"] == skill_course.course_id
            is_skill_course_in_response = True
            break
    assert is_skill_course_in_response


def test_create_skill_course(client: TestClient, db: Session) -> None:
    skill_id = create_random_skill(db).skill_id
    course_id = create_random_course(db).course_id
    data = {"skill_id": skill_id, "course_id": course_id}

    response = client.post(
        f"{settings.API_V1_STR}/skill_course",
        json=data,
    )
    print(data)

    content = response.json()
    assert response.status_code == 200
    assert content["skill_id"] == data["skill_id"]
    assert content["course_id"] == data["course_id"]
    assert "course_id" in content


def test_delete_skill_course_by_id(client: TestClient, db: Session) -> None:
    skill_course = create_random_skill_course(db)
    response = client.delete(
        f"{settings.API_V1_STR}/skill_course/{skill_course.skill_id}&{skill_course.course_id}"
    )
    assert response.status_code == 200
    content = response.json()
    assert content["skill_id"] == skill_course.skill_id
    assert content["course_id"] == skill_course.course_id


def test_delete_skill_course_by_id_non_existent(
    client: TestClient, db: Session
) -> None:
    skill_course = create_random_skill_course(db)
    skill_course2 = create_random_skill_course(db)
    response = client.delete(
        f"{settings.API_V1_STR}/skill_course/{skill_course.skill_id}&{skill_course2.course_id}"
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Combination of skill and course not found"
