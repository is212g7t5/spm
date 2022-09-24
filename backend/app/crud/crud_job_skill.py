from typing import Any

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.job_skill import Job_Skill
from app.schemas.job_skill import JobSkillCreate, JobSkillUpdate


class CRUDJobSkill(CRUDBase[Job_Skill, JobSkillCreate, JobSkillUpdate]):
    def get(self, db: Session, job_id: Any, skill_id: Any) -> Job_Skill:
        return (
            db.query(self.model)
            .filter(self.model.job_id == job_id, self.model.skill_id == skill_id)
            .first()
        )

    def get_by_job_id(self, db: Session, job_id: Any) -> Job_Skill:
        return db.query(self.model).filter(self.model.job_id == job_id).first()

    def get_by_skill_id(self, db: Session, skill_id: Any) -> Job_Skill:
        return db.query(self.model).filter(self.model.skill_id == skill_id).first()

    def create(self, db: Session, *, obj_in: JobSkillCreate) -> Job_Skill:
        db_obj = Job_Skill(
            job_id=obj_in.job_id,
            skill_id=obj_in.skill_id,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def remove(self, db: Session, *, job_id: int, skill_id: int) -> Job_Skill:
        obj = db.query(self.model).get((job_id, skill_id))
        db.delete(obj)
        db.commit()
        return obj

    # def update(
    #     self,
    #     db: Session,
    #     *,
    #     db_obj: Job_Skill,
    #     obj_in: Union[JobSkillUpdate, Dict[str, Any]],
    # ) -> Job_Skill:
    #     if isinstance(obj_in, dict):
    #         update_data = obj_in
    #     else:
    #         update_data = obj_in.dict(exclude_unset=True)
    #     return super().update(db, db_obj=db_obj, obj_in=update_data)


job_skill = CRUDJobSkill(Job_Skill)
