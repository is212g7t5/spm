from typing import Optional

from pydantic import BaseModel, validator


# Shared properties
class JobBase(BaseModel):
    job_name: str
    job_desc: str

    @validator("job_name")
    @classmethod
    def validate_job_name(cls, job_name):
        job_name = job_name.strip()
        assert len(job_name) >= 1, "job_name must minimally be 1 character long"
        assert len(job_name) <= 50, "job_name cannot exceed 50 characters"
        return job_name

    @validator("job_desc")
    @classmethod
    def validate_job_desc(cls, job_desc):
        assert len(job_desc) >= 1, "job_desc must minimally be 1 character long"
        assert len(job_desc) <= 255, "job_desc cannot exceed 255 characters"
        return job_desc


# Properties to receive via API on creation
class JobCreate(JobBase):
    is_active: Optional[bool] = True


# Properties to receive via API on update
class JobUpdate(JobBase):
    job_name: Optional[str] = None
    job_desc: Optional[str] = None
    is_active: Optional[bool] = None


class JobInDBBase(JobBase):
    job_id: Optional[int] = None
    is_active: bool = True

    class Config:
        orm_mode = True


# Additional properties to return via API
class Job(JobInDBBase):
    pass


# # Additional properties stored in DB
class JobInDB(JobInDBBase):
    pass
