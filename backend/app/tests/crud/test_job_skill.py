from sqlalchemy.orm import Session

from app import crud
from app.schemas.job_skill import JobSkillCreate #, JobSkillUpdate
from app.tests.utils.job_skill import create_random_job_skill
from app.tests.utils.job import create_random_job
from app.tests.utils.skill import create_random_skill


def test_create_job_skill(db: Session) -> None:

    job_id = create_random_job(db).job_id
    skill_id = create_random_skill(db).skill_id
    job_skill_in = JobSkillCreate(job_id=job_id, skill_id=skill_id)
    job_skill = crud.job_skill.create(
        db=db,
        obj_in=job_skill_in,
    )
    assert job_skill.job_id == job_id
    assert job_skill.skill_id == skill_id


def test_get_by_job_id(db: Session) -> None:
    job_skill = create_random_job_skill(db)
    stored_job = crud.job_skill.get_by_job_id(db=db, job_id=job_skill.job_id)
    assert stored_job
    assert job_skill.job_id == stored_job.job_id
    assert job_skill.skill_id == stored_job.skill_id


# def test_update_job_skill(db: Session) -> None:
#     job_skill = create_random_job_skill(db)
#     new_job_id = job_skill.job_id
#     new_skill_id = job_skill.skill_id
#     assert new_job_id != job_skill.job_id
#     assert new_skill_id != job_skill.skill_id
#     job_skill = JobSkillUpdate(job_id=new_job_id, skill_id=new_skill_id)
#     job_skill2 = crud.job_skill.update(db=db, db_obj=job_skill, obj_in=job_skill)
#     assert job_skill2.job_id == new_job_id
#     assert job_skill2.skill_id == new_skill_id


def test_delete_job_skill(db: Session) -> None:
    job_skill = create_random_job_skill(db)
    job_skill2 = crud.job_skill.remove(db=db, job_id=job_skill.job_id, skill_id=job_skill.skill_id)
    job_skill3 = crud.job_skill.get(db=db, job_id=job_skill.job_id, skill_id=job_skill.skill_id)
    assert job_skill3 is None
    assert job_skill2.job_id == job_skill.job_id
    assert job_skill2.skill_id == job_skill.skill_id

