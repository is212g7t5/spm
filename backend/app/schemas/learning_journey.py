from typing import Optional

from pydantic import BaseModel


# Shared properties
class LJBase(BaseModel):
    lj_id: Optional[int]
    staff_id: int
    job_id: int


# Properties to receive via API on creation
class LJCreate(LJBase):
    pass


# Properties to receive via API on update
class LJUpdate(LJBase):
    pass


class LJInDBBase(LJBase):
    class Config:
        orm_mode = True


# Additional properties to return via API
class LJ(LJInDBBase):
    pass


# # Additional properties stored in DB
class LJInDB(LJInDBBase):
    pass
