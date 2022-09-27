from sqlalchemy.orm import Session

from app import crud, models
from app.schemas.skill import SkillCreate
from app.tests.utils.course import create_random_course
from app.tests.utils.utils import random_boolean, random_lower_string, random_numbers

SKILL_ID_LENGTH = 5
SKILL_NAME_LENGTH = 50
SKILL_DESC_LENGTH = 255


def create_random_skill(db: Session) -> models.Skill:
    skill_id = random_numbers(SKILL_ID_LENGTH)
    course_id = create_random_course(db).course_id
    skill_name = random_lower_string(SKILL_NAME_LENGTH)
    skill_desc = random_lower_string(SKILL_DESC_LENGTH)
    is_active = random_boolean()

    skill_in = SkillCreate(
        skill_id=skill_id,
        course_id=course_id,
        skill_name=skill_name,
        skill_desc=skill_desc,
        is_active=is_active,
    )

    return crud.skill.create(db=db, obj_in=skill_in)
