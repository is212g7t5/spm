from typing import Optional

from pydantic import BaseModel


# Shared properties
class JobSkillBase(BaseModel):
    job_id: int
    skill_id: int


# Properties to receive via API on creation
class JobSkillCreate(JobSkillBase):
    pass


# Properties to receive via API on update
class JobSkillUpdate(JobSkillBase):
    pass


class JobSkillInDBBase(JobSkillBase):
    class Config:
        orm_mode = True


# Additional properties to return via API
class JobSkill(JobSkillInDBBase):
    pass


# # Additional properties stored in DB
class JobSkillInDB(JobSkillInDBBase):
    pass
