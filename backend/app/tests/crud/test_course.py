from sqlalchemy.orm import Session

from app import crud
from app.schemas.course import CourseCreate, CourseUpdate
from app.tests.utils.course import (
    COURSE_CATEGORY_LENGTH,
    COURSE_DESC_LENGTH,
    COURSE_ID_LENGTH,
    COURSE_NAME_LENGTH,
    COURSE_STATUS_LENGTH,
    COURSE_TYPE_LENGTH,
    create_random_course,
)
from app.tests.utils.utils import random_lower_string


def test_create_course(db: Session) -> None:
    course_id = random_lower_string(COURSE_ID_LENGTH)
    course_name = random_lower_string(COURSE_NAME_LENGTH)
    course_desc = random_lower_string(COURSE_DESC_LENGTH)
    course_status = random_lower_string(COURSE_STATUS_LENGTH)
    course_type = random_lower_string(COURSE_TYPE_LENGTH)
    course_category = random_lower_string(COURSE_CATEGORY_LENGTH)
    course_in = CourseCreate(
        course_id=course_id,
        course_name=course_name,
        course_desc=course_desc,
        course_status=course_status,
        course_type=course_type,
        course_category=course_category,
    )
    course = crud.course.create(
        db=db,
        obj_in=course_in,
    )
    assert course.course_id == course_id
    assert course.course_name == course_name
    assert course.course_desc == course_desc
    assert course.course_status == course_status
    assert course.course_type == course_type
    assert course.course_category == course_category


def test_create_course_minimum_fields(db: Session) -> None:
    course_id = random_lower_string(COURSE_ID_LENGTH)
    course_name = random_lower_string(COURSE_NAME_LENGTH)
    course_in = CourseCreate(
        course_id=course_id,
        course_name=course_name,
    )
    course = crud.course.create(
        db=db,
        obj_in=course_in,
    )
    assert course.course_id == course_id
    assert course.course_name == course_name
    assert course.course_desc == None
    assert course.course_status == None
    assert course.course_type == None
    assert course.course_category == None


def test_get_course(db: Session) -> None:
    course = create_random_course(db)
    stored_course = crud.course.get(db=db, course_id=course.course_id)
    assert stored_course
    assert course.course_id == stored_course.course_id
    assert course.course_name == stored_course.course_name
    assert course.course_desc == stored_course.course_desc
    assert course.course_status == stored_course.course_status
    assert course.course_type == stored_course.course_type
    assert course.course_category == stored_course.course_category


def test_update_course(db: Session) -> None:
    course = create_random_course(db)
    new_course_name = random_lower_string(COURSE_NAME_LENGTH)
    assert new_course_name != course.course_name
    course_update = CourseUpdate(
        course_id=course.course_id, course_name=new_course_name
    )
    course2 = crud.course.update(db=db, db_obj=course, obj_in=course_update)
    assert course2.course_id == course.course_id
    assert course2.course_name == new_course_name
    assert course2.course_desc == course.course_desc
    assert course2.course_status == course.course_status
    assert course2.course_type == course.course_type
    assert course2.course_category == course.course_category


def test_delete_course(db: Session) -> None:
    course = create_random_course(db)
    course2 = crud.course.remove(db=db, course_id=course.course_id)
    course3 = crud.course.get(db=db, course_id=course.course_id)
    assert course3 is None
    assert course2.course_id == course.course_id
    assert course2.course_name == course.course_name
    assert course2.course_desc == course.course_desc
    assert course2.course_status == course.course_status
    assert course2.course_type == course.course_type
    assert course2.course_category == course.course_category
