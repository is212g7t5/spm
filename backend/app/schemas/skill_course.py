from pydantic import BaseModel


# Shared properties
class SkillCourseBase(BaseModel):
    skill_id: int
    course_id: str


# Properties to receive via API on creation
class SkillCourseCreate(SkillCourseBase):
    pass


# Properties to receive via API on update
class SkillCourseUpdate(SkillCourseBase):
    pass


class SkillCourseInDBBase(SkillCourseBase):
    class Config:
        orm_mode = True


# Additional properties to return via API
class SkillCourse(SkillCourseInDBBase):
    pass


# # Additional properties stored in DB
class SkillCourseInDB(SkillCourseInDBBase):
    pass
