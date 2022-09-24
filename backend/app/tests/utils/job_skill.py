from sqlalchemy.orm import Session

from app import crud, models
from app.schemas.job_skill import JobSkillCreate
from app.tests.utils.job import create_random_job
from app.tests.utils.skill import create_random_skill


def create_random_job_skill(db: Session) -> models.Job_Skill:
    job_id = create_random_job(db).job_id
    skill_id = create_random_skill(db).skill_id

    job_skill_in = JobSkillCreate(job_id=job_id, skill_id=skill_id)
    return crud.job_skill.create(db=db, obj_in=job_skill_in)
