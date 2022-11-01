from sqlalchemy.orm import Session

from app import crud, models
from app.schemas.course import CourseCreate
from app.tests.utils.utils import random_lower_string

COURSE_ID_LENGTH = 20
COURSE_NAME_LENGTH = 50
COURSE_DESC_LENGTH = 255
COURSE_STATUS_LENGTH = 15
COURSE_TYPE_LENGTH = 10
COURSE_CATEGORY_LENGTH = 50


def create_random_course(db: Session, course_status: str = "Active") -> models.Course:
    course_id = random_lower_string(COURSE_ID_LENGTH)
    course_name = random_lower_string(COURSE_NAME_LENGTH)
    course_desc = random_lower_string(COURSE_DESC_LENGTH)
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
    return crud.course.create(db=db, obj_in=course_in)
