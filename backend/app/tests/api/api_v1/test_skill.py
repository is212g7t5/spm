from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.core.config import settings
from app.tests.utils.skill import create_random_skill
from app.tests.utils.skill_course import add_course_to_skill, create_random_skill_course
from app.tests.utils.utils import random_lower_string


def test_get_all_skills_non_existent(client: TestClient, db: Session) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/skill/all",
    )
    print(response.json())
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Skills not found"


def test_get_all_skills_and_courses_non_existent(
    client: TestClient, db: Session
) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/skill/courses/all",
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "No skills with courses in the database"


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


def test_get_all_skills_active_only(client: TestClient, db: Session) -> None:
    skill = create_random_skill(db, is_active=False)
    response = client.get(
        f"{settings.API_V1_STR}/skill/all?active_only=true",
    )
    assert response.status_code == 200
    content = response.json()
    assert len(content) == 2

    course_not_in_response = True
    for obj in content:
        if obj["skill_id"] == skill.skill_id:
            assert obj["skill_name"] == skill.skill_name
            assert obj["skill_desc"] == skill.skill_desc
            assert obj["is_active"] == skill.is_active
            course_not_in_response = False
            break
    assert course_not_in_response


def test_get_all_skills_and_courses(client: TestClient, db: Session) -> None:
    skill_course_instance = create_random_skill_course(db)
    extra_courses = add_course_to_skill(db, skill_course_instance.skill, 2)
    extra_courses.append(skill_course_instance.course)

    response = client.get(
        f"{settings.API_V1_STR}/skill/courses/all",
    )
    assert response.status_code == 200
    content = response.json()
    assert len(content) == 4

    skill_course_in_response = 0
    for obj in content:
        if obj["skill_id"] == skill_course_instance.skill_id:
            assert obj["skill_name"] == skill_course_instance.skill.skill_name
            assert obj["skill_desc"] == skill_course_instance.skill.skill_desc
            assert obj["is_active"] == skill_course_instance.skill.is_active
            for course in extra_courses:
                for objCourse in obj["courses"]:
                    if course.course_id == objCourse["course_id"]:
                        assert course.course_desc == objCourse["course_desc"]
                        assert course.course_name == objCourse["course_name"]
                        assert course.course_type == objCourse["course_type"]
                        assert course.course_status == objCourse["course_status"]
                        assert course.course_category == objCourse["course_category"]
                        skill_course_in_response += 1
                        break
    assert skill_course_in_response == 3


def test_get_active_skills_and_courses(client: TestClient, db: Session) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/skill/courses/all",
    )
    assert response.status_code == 200
    original_response_len = len(response.json())

    inactive_skill = create_random_skill(db, is_active=False)
    skill_course_instance = create_random_skill_course(db, skill=inactive_skill)

    response = client.get(
        f"{settings.API_V1_STR}/skill/courses/active",
    )
    assert response.status_code == 200
    assert (
        len(response.json()) + 1 == original_response_len
    )  # another inactive skill created in test_get_all_skills_active_only

    content = response.json()

    is_skill_course_in_response = False
    for obj in content:
        if obj["skill_id"] == skill_course_instance.skill_id:
            assert obj["skill_name"] == skill_course_instance.skill.skill_name
            assert obj["skill_desc"] == skill_course_instance.skill.skill_desc
            assert obj["is_active"] == skill_course_instance.skill.is_active
            for course in obj["courses"]:
                if course["course_id"] == skill_course_instance.course_id:
                    assert (
                        course["course_desc"]
                        == skill_course_instance.course.course_desc
                    )
                    assert (
                        course["course_name"]
                        == skill_course_instance.course.course_name
                    )
                    assert (
                        course["course_type"]
                        == skill_course_instance.course.course_type
                    )
                    assert (
                        course["course_status"]
                        == skill_course_instance.course.course_status
                    )
                    assert (
                        course["course_category"]
                        == skill_course_instance.course.course_category
                    )
                    break
            is_skill_course_in_response = True
            break
    assert not is_skill_course_in_response


def test_create_skill_short_skill_name_pass(client: TestClient, db: Session) -> None:
    data = {"skill_name": random_lower_string(1), "skill_desc": "Bar"}
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


def test_create_skill_short_skill_name_fail(client: TestClient, db: Session) -> None:
    data = {"skill_name": "", "skill_desc": "Bar"}
    response = client.post(
        f"{settings.API_V1_STR}/skill",
        json=data,
    )
    assert response.status_code == 422
    content = response.json()
    assert (
        content["detail"][0]["msg"] == "Skill name must minimally be 1 character long"
    )


def test_create_skill_long_skill_name_pass(client: TestClient, db: Session) -> None:
    data = {"skill_name": random_lower_string(50), "skill_desc": "Bar"}
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


def test_create_skill_long_skill_name_fail(client: TestClient, db: Session) -> None:
    data = {"skill_name": random_lower_string(51), "skill_desc": "Bar"}
    response = client.post(
        f"{settings.API_V1_STR}/skill",
        json=data,
    )
    assert response.status_code == 422
    content = response.json()
    assert content["detail"][0]["msg"] == "Skill name cannot exceed 50 characters"


def test_create_skill_duplicate_skill_name(client: TestClient, db: Session) -> None:
    skill = create_random_skill(db)
    data = {"skill_name": skill.skill_name, "skill_desc": "Bar"}
    response = client.post(
        f"{settings.API_V1_STR}/skill",
        json=data,
    )
    assert response.status_code == 409
    content = response.json()
    assert content["detail"] == "Skill name already exists"


def test_create_skill_white_space_skill_name(client: TestClient, db: Session) -> None:
    skill_name = random_lower_string(50)
    white_space_skill_name = " " * 50 + skill_name + " " * 50
    data = {"skill_name": white_space_skill_name, "skill_desc": "Bar"}
    response = client.post(
        f"{settings.API_V1_STR}/skill",
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["skill_name"] == skill_name
    assert content["skill_desc"] == data["skill_desc"]
    assert content["is_active"] == True
    assert "skill_id" in content


def test_create_skill_no_desc(client: TestClient, db: Session) -> None:
    data = {"skill_name": "Foo", "skill_desc": None}
    response = client.post(
        f"{settings.API_V1_STR}/skill",
        json=data,
    )
    assert response.status_code == 422


def test_create_skill_short_desc_pass(client: TestClient, db: Session) -> None:
    data = {"skill_name": "Moo", "skill_desc": random_lower_string(1)}
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


def test_create_skill_short_desc_fail(client: TestClient, db: Session) -> None:
    data = {"skill_name": "Boo", "skill_desc": ""}
    response = client.post(
        f"{settings.API_V1_STR}/skill",
        json=data,
    )
    assert response.status_code == 422
    content = response.json()
    assert (
        content["detail"][0]["msg"]
        == "Skill description must minimally be 1 character long"
    )


def test_create_skill_long_desc_pass(client: TestClient, db: Session) -> None:
    data = {"skill_name": "Meow", "skill_desc": random_lower_string(255)}
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


def test_create_skill_long_desc_fail(client: TestClient, db: Session) -> None:
    data = {"skill_name": "Crow", "skill_desc": random_lower_string(256)}
    response = client.post(
        f"{settings.API_V1_STR}/skill",
        json=data,
    )
    assert response.status_code == 422
    content = response.json()
    assert (
        content["detail"][0]["msg"] == "Skill description cannot exceed 255 characters"
    )


def test_create_skill_with_desc(client: TestClient, db: Session) -> None:
    data = {"skill_name": "Cow", "skill_desc": "Bar"}
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
