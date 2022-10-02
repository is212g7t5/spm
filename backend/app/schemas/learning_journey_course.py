from pydantic import BaseModel


# Shared properties
class LJCourseBase(BaseModel):
    lj_id: int
    course_id: str


# Properties to receive via API on creation
class LJCourseCreate(LJCourseBase):
    pass


# Properties to receive via API on update
class LJCourseUpdate(LJCourseBase):
    pass


class LJCourseInDBBase(LJCourseBase):
    class Config:
        orm_mode = True


# Additional properties to return via API
class LJCourse(LJCourseInDBBase):
    pass


# # Additional properties stored in DB
class LJCourseInDB(LJCourseInDBBase):
    pass
