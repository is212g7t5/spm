from sqlalchemy.orm import Session

from app import crud
from app.schemas.skill import SkillCreate, SkillUpdate
from app.tests.utils.skill import create_random_skill
from app.tests.utils.utils import random_lower_string


def test_create_staff(db: Session) -> None:
    skill_name = random_lower_string(50)
    skill_desc = random_lower_string(255)
    skill_in = SkillCreate(skill_name=skill_name, skill_desc=skill_desc, is_active=True)
    skill = crud.skill.create(db=db, obj_in=skill_in)
    assert skill.skill_name == skill_name
    assert skill.skill_desc == skill_desc


def test_get_skill(db: Session) -> None:
    skill = create_random_skill(db)
    stored_skill = crud.skill.get(db=db, skill_id=skill.skill_id)
    assert stored_skill
    assert skill.skill_id == stored_skill.skill_id
    assert skill.skill_name == stored_skill.skill_name
    assert skill.skill_desc == stored_skill.skill_desc


def test_update_skill(db: Session) -> None:
    skill = create_random_skill(db)
    new_skill_name = random_lower_string(50)
    assert new_skill_name != skill.skill_name
    skill_update = SkillUpdate(
        skill_name=new_skill_name,
        skill_desc=skill.skill_desc,
        is_active=skill.is_active,
    )
    skill2 = crud.skill.update(db=db, db_obj=skill, obj_in=skill_update)
    assert skill2.skill_id == skill.skill_id
    assert skill2.skill_desc == skill.skill_desc
    assert skill2.skill_name == new_skill_name


def test_delete_skill(db: Session) -> None:
    skill = create_random_skill(db)
    skill2 = crud.skill.remove(db=db, skill_id=skill.skill_id)
    skill3 = crud.skill.get(db=db, skill_id=skill.skill_id)
    assert skill3 is None
    assert skill2.skill_id == skill.skill_id
    assert skill2.skill_name == skill.skill_name
    assert skill2.skill_desc == skill.skill_desc
