from sqlalchemy.orm import Session

from app import crud
from app.schemas.job import JobCreate, JobUpdate
from app.tests.utils.job import create_random_job
from app.tests.utils.utils import random_lower_string


def test_create_job(db: Session) -> None:
    job_name = random_lower_string(50)
    job_desc = random_lower_string(255)
    job_in = JobCreate(job_name=job_name, job_desc=job_desc)
    job = crud.job.create(db=db, obj_in=job_in,)
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
    job_update = JobUpdate(job_name=new_job_name)
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
# def test_update_item(db: Session) -> None:
#     title = random_lower_string()
#     description = random_lower_string()
#     item_in = ItemCreate(title=title, description=description)
#     user = create_random_user(db)
#     item = crud.item.create_with_owner(db=db, obj_in=item_in, owner_id=user.id)
#     description2 = random_lower_string()
#     item_update = ItemUpdate(description=description2)
#     item2 = crud.item.update(db=db, db_obj=item, obj_in=item_update)
#     assert item.id == item2.id
#     assert item.title == item2.title
#     assert item2.description == description2
#     assert item.owner_id == item2.owner_id


# def test_delete_item(db: Session) -> None:
#     title = random_lower_string()
#     description = random_lower_string()
#     item_in = ItemCreate(title=title, description=description)
#     user = create_random_user(db)
#     item = crud.item.create_with_owner(db=db, obj_in=item_in, owner_id=user.id)
#     item2 = crud.item.remove(db=db, id=item.id)
#     item3 = crud.item.get(db=db, id=item.id)
#     assert item3 is None
#     assert item2.id == item.id
#     assert item2.title == title
#     assert item2.description == description
#     assert item2.owner_id == user.id
