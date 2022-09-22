from sqlalchemy.orm import Session

from app import crud
from app.schemas.job import JobCreate, JobUpdate
from app.tests.utils.job import create_random_job
from app.tests.utils.utils import random_lower_string


def test_create_job(db: Session) -> None:
    job_name = random_lower_string(50)
    job_desc = random_lower_string(255)
    job_in = JobCreate(job_name=job_name, job_desc=job_desc, is_active=True)
    job = crud.job.create(
        db=db,
        obj_in=job_in,
    )
    assert job.job_name == job_name
    assert job.job_desc == job_desc


def test_get_job(db: Session) -> None:
    job = create_random_job(db)
    stored_job = crud.job.get(db=db, job_id=job.job_id)
    assert stored_job
    assert job.job_id == stored_job.job_id
    assert job.job_name == stored_job.job_name
    assert job.job_desc == stored_job.job_desc


def test_update_job(db: Session) -> None:
    job = create_random_job(db)
    new_job_name = random_lower_string(20)
    assert new_job_name != job.job_name
    job_update = JobUpdate(
        job_name=new_job_name, job_desc=job.job_desc, is_active=job.is_active
    )
    job2 = crud.job.update(db=db, db_obj=job, obj_in=job_update)
    assert job2.job_id == job.job_id
    assert job2.job_desc == job.job_desc
    assert job2.job_name == new_job_name


def test_delete_job(db: Session) -> None:
    job = create_random_job(db)
    job2 = crud.job.remove(db=db, job_id=job.job_id)
    job3 = crud.job.get(db=db, job_id=job.job_id)
    assert job3 is None
    assert job2.job_id == job.job_id
    assert job2.job_name == job.job_name
    assert job2.job_desc == job.job_desc
