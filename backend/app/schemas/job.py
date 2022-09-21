from typing import Optional

from pydantic import BaseModel

# Shared properties
class JobBase(BaseModel):
    job_id: Optional[int]
    job_name: str
    job_desc: Optional[str]
    is_active: bool


# Properties to receive via API on creation
class JobCreate(JobBase):
    pass


# Properties to receive via API on update
class JobUpdate(JobBase):
    pass


class JobInDBBase(JobBase):
    job_id: Optional[int] = None

    class Config:
        orm_mode = True


# Additional properties to return via API
class Job(JobInDBBase):
    pass


# # Additional properties stored in DB
class JobInDB(JobInDBBase):
    pass
