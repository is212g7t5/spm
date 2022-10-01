from sqlalchemy.orm import Session

from app import crud, models
from app.schemas.staff import StaffCreate
from app.tests.utils.role import create_random_role
from app.tests.utils.utils import random_email, random_lower_string

STAFF_FNAME_LENGTH = 50
STAFF_FNAME_LENGTH = 50
DEPT_LENGTH = 50
EMAIL_LENGTH = 50


def create_random_staff(db: Session) -> models.Staff:
    staff_fname = random_lower_string(STAFF_FNAME_LENGTH)
    staff_lname = random_lower_string(STAFF_FNAME_LENGTH)
    dept = random_lower_string(DEPT_LENGTH)
    email = random_email(EMAIL_LENGTH)
    role = create_random_role(db)

    staff_in = StaffCreate(
        staff_fname=staff_fname,
        staff_lname=staff_lname,
        dept=dept,
        email=email,
        role=role.role_id,
    )
    return crud.staff.create(db=db, obj_in=staff_in)
