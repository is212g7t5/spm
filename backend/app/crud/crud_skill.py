from typing import Any, Dict, List, Union

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.skill import Skill
from app.schemas.skill import SkillCreate, SkillUpdate


class CRUDSkill(CRUDBase[Skill, SkillCreate, SkillUpdate]):
    def get(self, db: Session, skill_id: Any) -> Skill:
        return db.query(self.model).filter(self.model.skill_id == skill_id).first()

    def get_active(self, db: Session, *, skip: int = 0) -> List[Skill]:
        return db.query(self.model).filter(self.model.is_active == 1).offset(skip).all()

    def create(self, db: Session, *, obj_in: SkillCreate) -> Skill:
        db_obj = Skill(
            skill_id=obj_in.skill_id,
            skill_name=obj_in.skill_name,
            skill_desc=obj_in.skill_desc,
            is_active=obj_in.is_active,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self,
        db: Session,
        *,
        db_obj: Skill,
        obj_in: Union[SkillUpdate, Dict[str, Any]],
    ) -> Skill:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        return super().update(db, db_obj=db_obj, obj_in=update_data)

    def remove(self, db: Session, *, skill_id: int) -> Skill:
        obj = db.query(self.model).get(skill_id)
        db.delete(obj)
        db.commit()
        return obj


skill = CRUDSkill(Skill)
