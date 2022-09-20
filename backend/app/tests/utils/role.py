
from sqlalchemy.orm import Session

from app import crud, models
from app.schemas.role import RoleCreate
from app.tests.utils.utils import random_lower_string

ROLE_NAME_LENGTH = 20

def create_random_role(db: Session) -> models.Role:
    role_name = random_lower_string(ROLE_NAME_LENGTH)
    role_in = RoleCreate(role_name=role_name)
    return crud.role.create(db=db, obj_in=role_in)
