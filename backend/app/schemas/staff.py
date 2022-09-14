from typing import Optional

from pydantic import BaseModel, EmailStr


# Shared properties
class StaffBase(BaseModel):
    staff_id: Optional[int]
    staff_fname: str
    staff_lname: str
    dept: str
    email: EmailStr
    role: int


# Properties to receive via API on creation
class StaffCreate(StaffBase):
    pass


# Properties to receive via API on update
class StaffUpdate(StaffBase):
    pass


class StaffInDBBase(StaffBase):
    staff_id: Optional[int] = None

    class Config:
        orm_mode = True


# Additional properties to return via API
class Staff(StaffInDBBase):
    pass


# # Additional properties stored in DB
class StaffInDB(StaffInDBBase):
    pass
