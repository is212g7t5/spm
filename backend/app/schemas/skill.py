from typing import Optional

from pydantic import BaseModel 


# Shared properties
class SkillBase(BaseModel):
    skill_id: Optional[int]
    course_id: str
    skill_name: str
    skill_desc: str
    is_active: bool


# Properties to receive via API on creation
class SkillCreate(SkillBase):
    pass


# Properties to receive via API on update
class SkillUpdate(SkillBase):
    pass


class SkillInDBBase(SkillBase):
    skill_id: int

    class Config:
        orm_mode = True


# Additional properties to return via API
class Skill(SkillInDBBase):
    pass


# # Additional properties stored in DB
class SkillInDB(SkillInDBBase):
    pass