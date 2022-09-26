from sqlalchemy.orm import Session

from app import crud, models
from app.schemas.skill_course import SkillCourseCreate
from app.tests.utils.course import create_random_course
from app.tests.utils.skill import create_random_skill


def create_random_skill_course(db: Session) -> models.Skill_Course:
    skill_id = create_random_skill(db).skill_id
    course_id = create_random_course(db).course_id

    course_id_in = SkillCourseCreate(skill_id=skill_id, course_id=course_id)
    return crud.skill_course.create(db=db, obj_in=course_id_in)
