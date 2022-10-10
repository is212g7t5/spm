from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.core.config import settings
from app.tests.utils.job import create_random_job
from app.tests.utils.job_skill import add_skill_to_job, create_random_job_skill
from app.tests.utils.utils import random_lower_string


def test_get_all_jobs_non_existent(client: TestClient, db: Session) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/job/all",
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Jobs not found"


def test_get_all_jobs_and_skills_non_existent(client: TestClient, db: Session) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/job/skills",
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "No jobs with skils in the database"


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
    is_job_in_response = False
    for obj in content:
        if obj["job_id"] == job.job_id:
            assert obj["job_name"] == job.job_name
            assert obj["job_desc"] == job.job_desc
            assert obj["is_active"] == job.is_active
            is_job_in_response = True
            break
    assert is_job_in_response


def test_get_all_jobs_and_skills_one_job_one_skill(
    client: TestClient, db: Session
) -> None:
    job_skill_instance = create_random_job_skill(db)

    response = client.get(
        f"{settings.API_V1_STR}/job/skills",
    )

    assert response.status_code == 200
    assert len(response.json()) == 3
    content = response.json()

    is_job_skill_in_response = False
    for obj in content:
        if obj["job_id"] == job_skill_instance.job_id:
            assert obj["job_name"] == job_skill_instance.job.job_name
            assert obj["job_desc"] == job_skill_instance.job.job_desc
            assert obj["is_job_active"] == job_skill_instance.job.is_active
            assert obj["skill_id"] == job_skill_instance.skill.skill_id
            assert obj["skill_name"] == job_skill_instance.skill.skill_name
            assert obj["skill_desc"] == job_skill_instance.skill.skill_desc
            assert obj["is_skill_active"] == job_skill_instance.skill.is_active
            is_job_skill_in_response = True
            break
    assert is_job_skill_in_response


def test_get_all_jobs_and_skills_one_job_many_skills(
    client: TestClient, db: Session
) -> None:
    job_skill_instance = create_random_job_skill(db)
    extra_skills = add_skill_to_job(
        db, job_skill_instance.job, 2
    )  # total of 3 skills to job
    extra_skills.append(job_skill_instance.skill)

    response = client.get(
        f"{settings.API_V1_STR}/job/skills",
    )

    assert response.status_code == 200
    assert len(response.json()) == 6

    content = response.json()

    job_skill_in_response = 0
    for obj in content:
        if obj["job_id"] == job_skill_instance.job_id:
            assert obj["job_name"] == job_skill_instance.job.job_name
            assert obj["job_desc"] == job_skill_instance.job.job_desc
            assert obj["is_job_active"] == job_skill_instance.job.is_active
            for skill in extra_skills:
                if obj["skill_id"] == skill.skill_id:
                    assert obj["skill_name"] == skill.skill_name
                    assert obj["skill_desc"] == skill.skill_desc
                    assert obj["is_skill_active"] == skill.is_active
                    job_skill_in_response += 1
                    break

    assert job_skill_in_response == 3


def test_create_job_short_job_name_pass(client: TestClient, db: Session) -> None:
    data = {"job_name": random_lower_string(1), "job_desc": "Bar"}
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


def test_create_job_short_job_name_fail(client: TestClient, db: Session) -> None:
    data = {"job_name": "", "job_desc": "Bar"}
    response = client.post(
        f"{settings.API_V1_STR}/job",
        json=data,
    )
    assert response.status_code == 422
    content = response.json()
    assert content["detail"][0]["msg"] == "job_name must minimally be 1 character long"


def test_create_job_long_job_name_pass(client: TestClient, db: Session) -> None:
    data = {"job_name": random_lower_string(50), "job_desc": "Bar"}
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


def test_create_job_long_job_name_fail(client: TestClient, db: Session) -> None:
    data = {"job_name": random_lower_string(51), "job_desc": "Bar"}
    response = client.post(
        f"{settings.API_V1_STR}/job",
        json=data,
    )
    assert response.status_code == 422
    content = response.json()
    assert content["detail"][0]["msg"] == "job_name cannot exceed 50 characters"


def test_create_job_duplicate_job_name(client: TestClient, db: Session) -> None:
    job = create_random_job(db)
    data = {"job_name": job.job_name, "job_desc": "Bar"}
    response = client.post(
        f"{settings.API_V1_STR}/job",
        json=data,
    )
    assert response.status_code == 409
    content = response.json()
    assert content["detail"] == "job_name already exists"


def test_create_job_white_space_job_name(client: TestClient, db: Session) -> None:
    job_name = random_lower_string(50)
    white_space_job_name = " " * 50 + job_name + " " * 50
    data = {"job_name": white_space_job_name, "job_desc": "Bar"}
    response = client.post(
        f"{settings.API_V1_STR}/job",
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["job_name"] == job_name
    assert content["job_desc"] == data["job_desc"]
    assert content["is_active"] == True
    assert "job_id" in content


def test_create_job_no_desc(client: TestClient, db: Session) -> None:
    data = {"job_name": "Foo", "job_desc": None}
    response = client.post(
        f"{settings.API_V1_STR}/job",
        json=data,
    )
    assert response.status_code == 422


def test_create_job_short_desc_pass(client: TestClient, db: Session) -> None:
    data = {"job_name": "Moo", "job_desc": random_lower_string(1)}
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


def test_create_job_short_desc_fail(client: TestClient, db: Session) -> None:
    data = {"job_name": "Boo", "job_desc": ""}
    response = client.post(
        f"{settings.API_V1_STR}/job",
        json=data,
    )
    assert response.status_code == 422
    content = response.json()
    assert content["detail"][0]["msg"] == "job_desc must minimally be 1 character long"


def test_create_job_long_desc_pass(client: TestClient, db: Session) -> None:
    data = {"job_name": "Meow", "job_desc": random_lower_string(255)}
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


def test_create_job_long_desc_fail(client: TestClient, db: Session) -> None:
    data = {"job_name": "Crow", "job_desc": random_lower_string(256)}
    response = client.post(
        f"{settings.API_V1_STR}/job",
        json=data,
    )
    assert response.status_code == 422
    content = response.json()
    assert content["detail"][0]["msg"] == "job_desc cannot exceed 255 characters"


def test_create_job_with_desc(client: TestClient, db: Session) -> None:
    data = {"job_name": "Cow", "job_desc": "Bar"}
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


def test_update_job_short_job_name_pass(client: TestClient, db: Session) -> None:
    job = create_random_job(db)
    data = {"job_name": random_lower_string(1)}
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


def test_update_job_short_job_name_fail(client: TestClient, db: Session) -> None:
    job = create_random_job(db)
    data = {"job_name": ""}
    response = client.put(
        f"{settings.API_V1_STR}/job/{job.job_id}",
        json=data,
    )
    assert response.status_code == 422
    content = response.json()
    assert content["detail"][0]["msg"] == "job_name must minimally be 1 character long"


def test_update_job_long_job_name_pass(client: TestClient, db: Session) -> None:
    job = create_random_job(db)
    data = {"job_name": random_lower_string(50)}
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


def test_update_job_long_job_name_fail(client: TestClient, db: Session) -> None:
    job = create_random_job(db)
    data = {"job_name": random_lower_string(51)}
    response = client.put(
        f"{settings.API_V1_STR}/job/{job.job_id}",
        json=data,
    )
    assert response.status_code == 422
    content = response.json()
    assert content["detail"][0]["msg"] == "job_name cannot exceed 50 characters"


def test_update_job_duplicate_job_name(client: TestClient, db: Session) -> None:
    job = create_random_job(db)
    existing_job_name = create_random_job(db).job_name
    data = {"job_name": existing_job_name}
    assert job.job_name != existing_job_name
    response = client.put(
        f"{settings.API_V1_STR}/job/{job.job_id}",
        json=data,
    )
    assert response.status_code == 409
    content = response.json()
    assert content["detail"] == "job_name already exists"


def test_update_job_own_job_name(client: TestClient, db: Session) -> None:
    job = create_random_job(db)
    data = {"job_name": job.job_name}
    response = client.put(
        f"{settings.API_V1_STR}/job/{job.job_id}",
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["job_id"] == job.job_id
    assert content["job_desc"] == job.job_desc
    assert content["is_active"] == job.is_active
    assert content["job_name"] == data["job_name"] == job.job_name


def test_update_job_white_space_job_name(client: TestClient, db: Session) -> None:
    job = create_random_job(db)
    job_name = random_lower_string(50)
    white_space_job_name = " " * 50 + job_name + " " * 50
    data = {"job_name": white_space_job_name}
    response = client.put(
        f"{settings.API_V1_STR}/job/{job.job_id}",
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["job_id"] == job.job_id
    assert content["job_desc"] == job.job_desc
    assert content["is_active"] == job.is_active
    assert content["job_name"] == job_name


def test_update_job_short_job_desc_pass(client: TestClient, db: Session) -> None:
    job = create_random_job(db)
    data = {"job_desc": "a"}
    response = client.put(
        f"{settings.API_V1_STR}/job/{job.job_id}",
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["job_id"] == job.job_id
    assert content["job_name"] == job.job_name
    assert content["is_active"] == job.is_active
    assert content["job_desc"] == data["job_desc"]


def test_update_job_short_job_desc_fail(client: TestClient, db: Session) -> None:
    job = create_random_job(db)
    data = {"job_desc": ""}
    response = client.put(
        f"{settings.API_V1_STR}/job/{job.job_id}",
        json=data,
    )
    assert response.status_code == 422
    content = response.json()
    assert content["detail"][0]["msg"] == "job_desc must minimally be 1 character long"


def test_update_job_long_job_desc_pass(client: TestClient, db: Session) -> None:
    job = create_random_job(db)
    data = {"job_desc": random_lower_string(255)}
    response = client.put(
        f"{settings.API_V1_STR}/job/{job.job_id}",
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["job_id"] == job.job_id
    assert content["job_name"] == job.job_name
    assert content["is_active"] == job.is_active
    assert content["job_desc"] == data["job_desc"]


def test_update_job_long_job_desc_fail(client: TestClient, db: Session) -> None:
    job = create_random_job(db)
    data = {"job_desc": random_lower_string(256)}
    response = client.put(
        f"{settings.API_V1_STR}/job/{job.job_id}",
        json=data,
    )
    assert response.status_code == 422
    content = response.json()
    assert content["detail"][0]["msg"] == "job_desc cannot exceed 255 characters"


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
