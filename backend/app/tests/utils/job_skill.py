from sqlalchemy.orm import Session

from app import crud, models
from app.schemas.job_skill import JobSkillCreate
from app.tests.utils.utils import random_numbers

JOB_SKILL_ID_LENGTH = 20
SKILL_SKILL_ID_LENGTH = 20

def create_random_job_skill(db: Session) -> models.Job_Skill:
    job_id = random_numbers(JOB_SKILL_ID_LENGTH)
    skill_id = random_numbers(SKILL_SKILL_ID_LENGTH)

    job_skill_in = JobSkillCreate(job_id=job_id, skill_id=skill_id)
    return crud.job_skill.create(db=db, obj_in=job_skill_in)