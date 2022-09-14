from typing import Any, Dict, Union

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.staff import Staff
from app.schemas.staff import StaffCreate, StaffUpdate


class CRUDStaff(CRUDBase[Staff, StaffCreate, StaffUpdate]):
    def create(self, db: Session, *, obj_in: StaffCreate) -> Staff:
        db_obj = Staff(
            staff_fname=obj_in.staff_fname,
            staff_lname=obj_in.staff_lname,
            dept=obj_in.dept,
            email=obj_in.email,
            role=obj_in.role,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self,
        db: Session,
        *,
        db_obj: Staff,
        obj_in: Union[StaffUpdate, Dict[str, Any]],
    ) -> Staff:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        return super().update(db, db_obj=db_obj, obj_in=update_data)

    # def authenticate(
    #     self, db: Session, *, username: str, password: str
    # ) -> Optional[Staff]:
    #     staff = self.get_by_username(db, username=username)
    #     if not staff:
    #         return None
    #     return staff


staff = CRUDStaff(Staff)
