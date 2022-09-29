from sqlalchemy.orm import Session

from app import crud, models
from app.schemas.job_skill import JobSkillCreate
from app.tests.utils.job import create_random_job
from app.tests.utils.skill import create_random_skill


def create_random_job_skill(db: Session) -> models.Job_Skill:
    job = create_random_job(db)
    skill = create_random_skill(db)

    job_skill_in = JobSkillCreate(job_id=job.job_id, skill_id=skill.skill_id)
    job_skill_obj = crud.job_skill.create(db=db, obj_in=job_skill_in)
    job_skill_obj.job = job
    job_skill_obj.skill = skill
    return job_skill_obj

def add_skill_to_job(db: Session, job: models.Job, skills_to_add: int):
    new_skills = []
    for i in range(skills_to_add):
        skill = create_random_skill(db)
        job_skill_in = JobSkillCreate(job_id=job.job_id, skill_id=skill.skill_id)
        crud.job_skill.create(db=db, obj_in=job_skill_in)
        new_skills.append(skill)
    return new_skills
