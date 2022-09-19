from sqlalchemy import Column, Integer, String

from app.db.base_class import Base


class Registration(Base):
    reg_id = Column(Integer, primary_key=True, index=True)
    course_id = Column(String, nullable=False)
    staff_id = Column(Integer, nullable=False)
    reg_status = Column(String, nullable=False)
    completion_status = Column(String, nullable=False)
