from sqlalchemy.orm import Session

from app import crud, models
from app.schemas.skill import SkillCreate
from app.tests.utils.utils import random_lower_string

SKILL_NAME_LENGTH = 50
SKILL_DESC_LENGTH = 255


def create_random_skill(db: Session) -> models.Skill:
    skill_name = random_lower_string(SKILL_NAME_LENGTH)
    skill_desc = random_lower_string(SKILL_DESC_LENGTH)
    skill_in = SkillCreate(skill_name=skill_name, skill_desc=skill_desc, is_active=True)
    return crud.skill.create(db=db, obj_in=skill_in)
