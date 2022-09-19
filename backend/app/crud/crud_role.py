from typing import Any, Dict, Union

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.role import Role
from app.schemas.role import RoleCreate, RoleUpdate


class CRUDRole(CRUDBase[Role, RoleCreate, RoleUpdate]):
    def get(self, db: Session, role_id: Any) -> Role:
        return db.query(self.model).get(role_id)

    def create(self, db: Session, *, obj_in: RoleCreate) -> Role:
        db_obj = Role(
            role_name=obj_in.role_name,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self,
        db: Session,
        *,
        db_obj: Role,
        obj_in: Union[RoleUpdate, Dict[str, Any]],
    ) -> Role:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        return super().update(db, db_obj=db_obj, obj_in=update_data)

    def remove(self, db: Session, *, role_id: int) -> Role:
        obj = db.query(self.model).get(role_id)
        db.delete(obj)
        db.commit()
        return obj


role = CRUDRole(Role)
