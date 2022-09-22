from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.core.config import settings
from app.tests.utils.course import COURSE_ID_LENGTH, create_random_course
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
