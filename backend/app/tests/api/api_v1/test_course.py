from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.core.config import settings
from app.tests.utils.course import COURSE_ID_LENGTH, create_random_course
from app.tests.utils.skill import create_random_skill
from app.tests.utils.skill_course import create_random_skill_course
from app.tests.utils.utils import random_lower_string


def test_get_all_courses_non_existent(client: TestClient, db: Session) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/course/all",
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Courses not found"


def test_get_course_by_id(client: TestClient, db: Session) -> None:
    course = create_random_course(db)
    response = client.get(
        f"{settings.API_V1_STR}/course/{course.course_id}",
    )
    assert response.status_code == 200
    content = response.json()
    assert content["course_id"] == course.course_id
    assert content["course_name"] == course.course_name
    assert content["course_desc"] == course.course_desc
    assert content["course_status"] == course.course_status
    assert content["course_type"] == course.course_type
    assert content["course_category"] == course.course_category


def test_get_course_by_id_non_existent(client: TestClient, db: Session) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/course/{random_lower_string(COURSE_ID_LENGTH)}",
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Course not found"


def test_get_all_courses(client: TestClient, db: Session) -> None:
    course = create_random_course(db)
    response = client.get(
        f"{settings.API_V1_STR}/course/all",
    )
    assert response.status_code == 200
    content = response.json()
    assert len(content) == 2

    is_course_in_response = False
    for obj in content:
        if obj["course_id"] == course.course_id:
            assert obj["course_name"] == course.course_name
            assert obj["course_desc"] == course.course_desc
            assert obj["course_status"] == course.course_status
            assert obj["course_type"] == course.course_type
            assert obj["course_category"] == course.course_category
            is_course_in_response = True
            break
    assert is_course_in_response


def test_get_courses_and_active_skills(client: TestClient, db: Session) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/course/all",
    )
    assert response.status_code == 200
    original_response_len = len(response.json())

    inactive_course = create_random_course(db, course_status="Pending")
    active_skill = create_random_skill(db, is_active=True)
    inactive_skill = create_random_skill(db, is_active=False)
    skill_course_instance_1 = create_random_skill_course(
        db, course=inactive_course, skill=active_skill
    )
    skill_course_instance_2 = create_random_skill_course(
        db, course=inactive_course, skill=inactive_skill
    )

    response = client.get(
        f"{settings.API_V1_STR}/course/skills/active",
    )
    assert response.status_code == 200
    assert len(response.json()) == original_response_len + 1

    content = response.json()

    is_skill_course_in_response = False
    for obj in content:
        if obj["course_id"] == skill_course_instance_1.course_id:
            assert obj["course_name"] == skill_course_instance_1.course.course_name
            assert obj["course_desc"] == skill_course_instance_1.course.course_desc
            assert obj["course_type"] == skill_course_instance_1.course.course_type
            assert obj["course_status"] == skill_course_instance_1.course.course_status
            assert (
                obj["course_category"] == skill_course_instance_1.course.course_category
            )
            assert len(obj["skills"]) == 1
            for skill in obj["skills"]:
                if skill["skill_id"] == skill_course_instance_1.skill_id:
                    assert (
                        skill["skill_name"] == skill_course_instance_1.skill.skill_name
                    )
                    assert (
                        skill["skill_desc"] == skill_course_instance_1.skill.skill_desc
                    )
                    assert skill["is_active"] == skill_course_instance_1.skill.is_active
                    break
            is_skill_course_in_response = True
            break
    assert is_skill_course_in_response


def test_create_course_minimum_fields(client: TestClient, db: Session) -> None:
    data = {"course_id": "CSR111", "course_name": "Foo"}
    response = client.post(
        f"{settings.API_V1_STR}/course",
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["course_id"] == data["course_id"]
    assert content["course_name"] == data["course_name"]


def test_create_course_all_fields(client: TestClient, db: Session) -> None:
    data = {
        "course_id": "CSR112",
        "course_name": "Chilli",
        "course_desc": "Lorem ipsum",
        "course_status": "Active",
        "course_type": "Internal",
        "course_category": "Technical",
    }
    response = client.post(
        f"{settings.API_V1_STR}/course",
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["course_id"] == data["course_id"]
    assert content["course_name"] == data["course_name"]
    assert content["course_desc"] == data["course_desc"]
    assert content["course_status"] == data["course_status"]
    assert content["course_type"] == data["course_type"]
    assert content["course_category"] == data["course_category"]


def test_update_course_by_id(client: TestClient, db: Session) -> None:
    course = create_random_course(db)
    data = {"course_name": "Bar"}
    assert course.course_name != data["course_name"]
    response = client.put(
        f"{settings.API_V1_STR}/course/{course.course_id}",
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["course_id"] == course.course_id
    assert content["course_name"] == data["course_name"]
    assert content["course_desc"] == course.course_desc
    assert content["course_status"] == course.course_status
    assert content["course_type"] == course.course_type
    assert content["course_category"] == course.course_category


def test_update_course_by_id_non_existent(client: TestClient, db: Session) -> None:
    data = {"course_name": "Bar"}
    response = client.put(
        f"{settings.API_V1_STR}/course/{random_lower_string(COURSE_ID_LENGTH)}",
        json=data,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Course not found"


def test_delete_course_by_id(client: TestClient, db: Session) -> None:
    course = create_random_course(db)
    response = client.delete(f"{settings.API_V1_STR}/course/{course.course_id}")
    assert response.status_code == 200
    content = response.json()
    assert content["course_id"] == course.course_id
    assert content["course_name"] == course.course_name
    assert content["course_desc"] == course.course_desc
    assert content["course_status"] == course.course_status
    assert content["course_type"] == course.course_type
    assert content["course_category"] == course.course_category


def test_delete_course_by_id_non_existent(client: TestClient, db: Session) -> None:
    response = client.delete(
        f"{settings.API_V1_STR}/course/{random_lower_string(COURSE_ID_LENGTH)}"
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Course not found"
