from typing import Optional

from pydantic import BaseModel


# Shared properties
class CourseBase(BaseModel):
    course_id: str
    course_name: str
    course_desc: Optional[str]
    course_status: Optional[str]
    course_type: Optional[str]
    course_category: Optional[str]


# Properties to receive via API on creation
class CourseCreate(CourseBase):
    pass


# Properties to receive via API on update
class CourseUpdate(CourseBase):
    pass


class CourseInDBBase(CourseBase):
    class Config:
        orm_mode = True


# Additional properties to return via API
class Course(CourseInDBBase):
    pass


# # Additional properties stored in DB
class CourseInDB(CourseInDBBase):
    pass
