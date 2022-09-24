from sqlalchemy.orm import Session

from app import crud
from app.schemas.skill_course import SkillCourseCreate
from app.tests.utils.course import create_random_course
from app.tests.utils.skill import create_random_skill
from app.tests.utils.skill_course import create_random_skill_course


def test_create_skill_course(db: Session) -> None:

    skill_id = create_random_skill(db).skill_id
    course_id = create_random_course(db).course_id
    skill_course_in = SkillCourseCreate(skill_id=skill_id, course_id=course_id)
    skill_course = crud.skill_course.create(
        db=db,
        obj_in=skill_course_in,
    )
    assert skill_course.skill_id == skill_id
    assert skill_course.course_id == course_id


def test_get_by_skill_id(db: Session) -> None:
    skill_course = create_random_skill_course(db)
    stored_skill_course = crud.skill_course.get_by_skill_id(
        db=db, skill_id=skill_course.skill_id
    )
    assert stored_skill_course
    assert skill_course.skill_id == stored_skill_course.skill_id
    assert skill_course.course_id == stored_skill_course.course_id


def test_get_by_course_id(db: Session) -> None:
    skill_course = create_random_skill_course(db)
    stored_skill_course = crud.skill_course.get_by_course_id(
        db=db, course_id=skill_course.course_id
    )
    assert stored_skill_course
    assert skill_course.skill_id == stored_skill_course.skill_id
    assert skill_course.course_id == stored_skill_course.course_id


def test_delete_skill_course(db: Session) -> None:
    skill_course = create_random_skill_course(db)
    skill_course2 = crud.skill_course.remove(
        db=db, skill_id=skill_course.skill_id, course_id=skill_course.course_id
    )
    skill_course3 = crud.skill_course.get(
        db=db, skill_id=skill_course.skill_id, course_id=skill_course.course_id
    )
    assert skill_course3 is None
    assert skill_course2.skill_id == skill_course.skill_id
    assert skill_course2.course_id == skill_course.course_id
