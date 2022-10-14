from sqlalchemy.orm import Session

from app import crud, models
from app.schemas.skill_course import SkillCourseCreate
from app.tests.utils.course import create_random_course
from app.tests.utils.skill import create_random_skill


def create_random_skill_course(
    db: Session, skill: models.Skill = None
) -> models.Skill_Course:
    skill = skill or create_random_skill(db)
    course = create_random_course(db)

    skill_course_in = SkillCourseCreate(
        skill_id=skill.skill_id, course_id=course.course_id
    )
    skill_course_obj = crud.skill_course.create(db=db, obj_in=skill_course_in)
    skill_course_obj.skill = skill
    skill_course_obj.course = course
    return skill_course_obj


def add_course_to_skill(db: Session, skill: models.Skill, courses_to_add: int):
    new_courses = []
    for i in range(courses_to_add):
        course = create_random_course(db)
        skill_course_in = SkillCourseCreate(
            skill_id=skill.skill_id, course_id=course.course_id
        )
        crud.skill_course.create(db=db, obj_in=skill_course_in)
        new_courses.append(course)
    return new_courses
