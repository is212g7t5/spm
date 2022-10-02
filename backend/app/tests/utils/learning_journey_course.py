from sqlalchemy.orm import Session

from app import crud, models
from app.schemas.learning_journey_course import LJCourseCreate
from app.tests.utils.course import create_random_course
from app.tests.utils.learning_journey import create_random_learning_journey


def create_random_learning_journey_course(
    db: Session,
) -> models.Learning_Journey_Course:
    lj_id = create_random_learning_journey(db).lj_id
    course_id = create_random_course(db).course_id

    learning_journey_course_in = LJCourseCreate(lj_id=lj_id, course_id=course_id)
    return crud.learning_journey_course.create(db=db, obj_in=learning_journey_course_in)
