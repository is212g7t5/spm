from sqlalchemy import Column, Integer, String

from app.db.base_class import Base


class Skill(Base):
    skill_id = Column(Integer, primary_key=True, index=True)
    course_id = Column(String, ForeignKey("course.course_id"), nullable=False) 
    skill_name = Column(String, nullable=False)
    skill_desc = Column(String)
    Is_Active = Column(Boolean)
