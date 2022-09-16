from typing import Any, Dict, Union

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.registration import Registration
from app.schemas.registration import RegistrationCreate, RegistrationUpdate


class CRUDRegistration(CRUDBase[Registration, RegistrationCreate, RegistrationUpdate]):
    def get(self, db: Session, reg_id: Any) -> Registration:
        return db.query(self.model).filter(self.model.reg_id == reg_id).first()

    def create(self, db: Session, *, obj_in: RegistrationCreate) -> Registration:
        db_obj = Registration(
            reg_id=obj_in.reg_id,
            course_id=obj_in.course_id,
            staff_id=obj_in.staff_id,
            reg_status=obj_in.reg_status,
            completion_status=obj_in.completion_status,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self,
        db: Session,
        *,
        db_obj: Registration,
        obj_in: Union[RegistrationUpdate, Dict[str, Any]],
    ) -> Registration:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        return super().update(db, db_obj=db_obj, obj_in=update_data)

    def remove(self, db: Session, *, reg_id: int) -> Registration:
        obj = db.query(self.model).get(reg_id)
        db.delete(obj)
        db.commit()
        return obj


registration = CRUDRegistration(Registration)
