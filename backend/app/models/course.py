from sqlalchemy import Column, String

from app.db.base_class import Base


class Course(Base):
    course_id = Column(String, primary_key=True, index=True)
    course_name = Column(String, nullable=False)
    course_desc = Column(String)
    course_status = Column(String)
    course_type = Column(String)
    course_category = Column(String)
