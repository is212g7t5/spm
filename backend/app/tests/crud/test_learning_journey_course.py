from sqlalchemy.orm import Session

from app import crud
from app.schemas.learning_journey_course import LJCourseCreate
from app.tests.utils.course import create_random_course
from app.tests.utils.learning_journey import create_random_learning_journey
from app.tests.utils.learning_journey_course import (
    create_random_learning_journey_course,
)


def test_create_learning_journey_course(db: Session) -> None:

    lj_id = create_random_learning_journey(db).lj_id
    course_id = create_random_course(db).course_id
    learning_journey_course_in = LJCourseCreate(lj_id=lj_id, course_id=course_id)
    learning_journey_course = crud.learning_journey_course.create(
        db=db,
        obj_in=learning_journey_course_in,
    )
    assert learning_journey_course.lj_id == lj_id
    assert learning_journey_course.course_id == course_id


def test_get_learning_journey_course(db: Session) -> None:
    learning_journey_course = create_random_learning_journey_course(db)
    stored_learning_journey_course = crud.learning_journey_course.get(
        db=db,
        lj_id=learning_journey_course.lj_id,
        course_id=learning_journey_course.course_id,
    )
    assert stored_learning_journey_course
    assert learning_journey_course.lj_id == stored_learning_journey_course.lj_id
    assert learning_journey_course.course_id == stored_learning_journey_course.course_id


def test_delete_learning_journey(db: Session) -> None:
    learning_journey_course = create_random_learning_journey_course(db)
    learning_journey_course2 = crud.learning_journey_course.remove(
        db=db,
        lj_id=learning_journey_course.lj_id,
        course_id=learning_journey_course.course_id,
    )
    learning_journey_course3 = crud.learning_journey_course.get(
        db=db,
        lj_id=learning_journey_course.lj_id,
        course_id=learning_journey_course.course_id,
    )
    assert learning_journey_course3 is None
    assert learning_journey_course2.lj_id == learning_journey_course.lj_id
    assert learning_journey_course2.course_id == learning_journey_course.course_id
