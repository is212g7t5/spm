from typing import Any, Dict, Union

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.job_skill import JobSkill
from app.schemas.job_skill import JobSkillCreate, JobSkillUpdate


class CRUDJobSkill(CRUDBase[JobSkill, JobSkillCreate, JobSkillUpdate]):
    def get(self, db: Session, job_id: Any, skill_id: Any) -> JobSkill:
        return db.query(self.model).filter(self.model.job_id == job_id & self.model.skill_id == skill_id).first()

    def create(self, db: Session, *, obj_in: JobSkillCreate) -> JobSkill:
        db_obj = JobSkill(
            job_id=obj_in.job_id,
            skill_id=obj_in.skill_id,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self,
        db: Session,
        *,
        db_obj: JobSkill,
        obj_in: Union[JobSkillUpdate, Dict[str, Any]],
    ) -> JobSkill:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        return super().update(db, db_obj=db_obj, obj_in=update_data)

    def remove(self, db: Session, *, job_id: int, skill_id: int) -> JobSkill:
        obj = db.query(self.model).get(job_id & skill_id)
        db.delete(obj)
        db.commit()
        return obj


registration = CRUDJobSkill(JobSkill)
