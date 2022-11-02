from typing import Optional

from pydantic import BaseModel, validator


# Shared properties
class SkillBase(BaseModel):
    skill_name: str
    skill_desc: str

    @validator("skill_name")
    @classmethod
    def validate_skill_name(cls, skill_name):
        skill_name = skill_name.strip()
        assert len(skill_name) >= 1, "Skill name must minimally be 1 character long"
        assert len(skill_name) <= 50, "Skill name cannot exceed 50 characters"
        return skill_name

    @validator("skill_desc")
    @classmethod
    def validate_skill_desc(cls, skill_desc):
        skill_desc = skill_desc.strip()
        assert (
            len(skill_desc) >= 1
        ), "Skill description must minimally be 1 character long"
        assert len(skill_desc) <= 255, "Skill description cannot exceed 255 characters"
        return skill_desc


# Properties to receive via API on creation
class SkillCreate(SkillBase):
    is_active: Optional[bool] = True


# Properties to receive via API on update
class SkillUpdate(SkillBase):
    skill_name: Optional[str] = None
    skill_desc: Optional[str] = None
    is_active: Optional[bool] = None


class SkillInDBBase(SkillBase):
    skill_id: Optional[int] = None
    is_active: bool = True

    class Config:
        orm_mode = True


# Additional properties to return via API
class Skill(SkillInDBBase):
    pass


# # Additional properties stored in DB
class SkillInDB(SkillInDBBase):
    pass
