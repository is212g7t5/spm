
from sqlalchemy.orm import Session

from app import crud, models
from app.schemas.job import JobCreate
from app.tests.utils.utils import random_lower_string

JOB_NAME_LENGTH = 50
JOB_DESC_LENGTH = 255

def create_random_job(db: Session) -> models.Job:
    job_name = random_lower_string(JOB_NAME_LENGTH)
    job_desc = random_lower_string(JOB_DESC_LENGTH)
    job_in = JobCreate(job_name=job_name, job_desc=job_desc)
    return crud.job.create(db=db, obj_in=job_in)
