from sqlalchemy.orm import Session

from app import crud, models
from app.schemas.learning_journey import LJCreate
from app.tests.utils.job import create_random_job
from app.tests.utils.staff import create_random_staff


def create_random_learning_journey(db: Session) -> models.Learning_Journey:
    staff = create_random_staff(db)
    job = create_random_job(db)

    learning_journey_in = LJCreate(staff_id=staff.staff_id, job_id=job.job_id)
    learning_journey_obj = crud.learning_journey.create(
        db=db, obj_in=learning_journey_in
    )
    return learning_journey_obj
