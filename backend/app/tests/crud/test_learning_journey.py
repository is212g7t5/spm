from sqlalchemy.orm import Session

from app import crud
from app.schemas.learning_journey import LJCreate, LJUpdate
from app.tests.utils.staff import create_random_staff
from app.tests.utils.job import create_random_job
from app.tests.utils.learning_journey import create_random_learning_journey
from app.tests.utils.utils import random_lower_string


def test_create_learning_journey(db: Session) -> None:
    staff_id = create_random_staff(db).staff_id
    job_id = create_random_job(db).job_id
    learning_journey_in = LJCreate(staff_id=staff_id, job_id=job_id)
    learning_journey = crud.learning_journey.create(
        db=db,
        obj_in=learning_journey_in,
    )
    assert learning_journey.staff_id == staff_id
    assert learning_journey.job_id == job_id


def test_get_learning_journey(db: Session) -> None:
    learning_journey = create_random_learning_journey(db)
    stored_learning_journey = crud.learning_journey.get(
        db=db, lj_id=learning_journey.lj_id
    )
    assert stored_learning_journey
    assert learning_journey.lj_id == stored_learning_journey.lj_id
    assert learning_journey.staff_id == stored_learning_journey.staff_id
    assert learning_journey.job_id == stored_learning_journey.job_id


def test_delete_learning_journey(db: Session) -> None:
    learning_journey = create_random_learning_journey(db)
    learning_journey2 = crud.learning_journey.remove(
        db=db, lj_id=learning_journey.lj_id
    )
    learning_journey3 = crud.learning_journey.get(
        db=db, lj_id=learning_journey.lj_id
    )
    assert learning_journey3 is None
    assert learning_journey2.lj_id == learning_journey.lj_id
    assert learning_journey2.staff_id == learning_journey.staff_id
    assert learning_journey2.job_id == learning_journey.job_id