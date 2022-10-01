from typing import Any

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.learning_journey import Learning_Journey
from app.schemas.learning_journey import LJCreate


class CRUDLJ(CRUDBase[Learning_Journey, LJCreate, LJCreate]):
    def get(self, db: Session, lj_id: Any) -> Learning_Journey:
        return db.query(self.model).filter(self.model.lj_id == lj_id).first()

    def get_by_staff_id(
        self,
        db: Session,
        *,
        staff_id: Any,
        skip: int = 0,
        limit: int = 100,
        active_only: bool = False
    ) -> Learning_Journey:
        return (
            db.query(self.model)
            .filter(self.model.staff_id == staff_id)
            .offset(skip)
            .limit(limit)
            .all()
        )

    def get_by_job_id(
        self,
        db: Session,
        *,
        job_id: Any,
        skip: int = 0,
        limit: int = 100,
        active_only: bool = False
    ) -> Learning_Journey:
        return (
            db.query(self.model)
            .filter(self.model.job_id == job_id)
            .offset(skip)
            .limit(limit)
            .all()
        )

    def get_by_staff_and_job_id(
        self,
        db: Session,
        *,
        staff_id: Any,
        job_id: Any,
        skip: int = 0,
        limit: int = 100,
        active_only: bool = False
    ) -> Learning_Journey:
        return (
            db.query(self.model)
            .filter(self.model.staff_id == staff_id, self.model.job_id == job_id)
            .offset(skip)
            .limit(limit)
            .all()
        )

    def create(self, db: Session, *, obj_in: LJCreate) -> Learning_Journey:
        db_obj = Learning_Journey(
            staff_id=obj_in.staff_id,
            job_id=obj_in.job_id,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def remove(self, db: Session, *, lj_id: Any) -> Learning_Journey:
        obj = db.query(self.model).get(lj_id)
        db.delete(obj)
        db.commit()
        return obj


learning_journey = CRUDLJ(Learning_Journey)
