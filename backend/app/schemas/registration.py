from typing import Optional

from pydantic import BaseModel


# Shared properties
class RegistrationBase(BaseModel):
    reg_id: Optional[int]
    course_id: str
    staff_id: int
    reg_status: str
    completion_status: str


# Properties to receive via API on creation
class RegistrationCreate(RegistrationBase):
    pass


# Properties to receive via API on update
class RegistrationUpdate(RegistrationBase):
    pass


class RegistrationInDBBase(RegistrationBase):
    reg_id: Optional[int]

    class Config:
        orm_mode = True


# Additional properties to return via API
class Registration(RegistrationInDBBase):
    pass


# # Additional properties stored in DB
class RegistrationInDB(RegistrationInDBBase):
    pass
