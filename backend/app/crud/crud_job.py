from typing import Any, Dict, Union

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.job import Job
from app.schemas.job import JobCreate, JobUpdate


class CRUDJob(CRUDBase[Job, JobCreate, JobUpdate]):
    def get(self, db: Session, job_id: Any) -> Job:
        return db.query(self.model).filter(self.model.job_id == job_id).first()

    def get_by_job_name(self, db: Session, job_name: Any) -> Job:
        return db.query(self.model).filter(self.model.job_name == job_name).first()

    def create(self, db: Session, *, obj_in: JobCreate) -> Job:
        db_obj = Job(
            job_name=obj_in.job_name,
            job_desc=obj_in.job_desc,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self,
        db: Session,
        *,
        db_obj: Job,
        obj_in: Union[JobUpdate, Dict[str, Any]],
    ) -> Job:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        return super().update(db, db_obj=db_obj, obj_in=update_data)

    def remove(self, db: Session, *, job_id: int) -> Job:
        obj = db.query(self.model).get(job_id)
        db.delete(obj)
        db.commit()
        return obj


job = CRUDJob(Job)
