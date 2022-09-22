from sqlalchemy import Column, Integer, String

from app.db.base_class import Base


class Job_Skill(Base):
    job_id = Column(Integer, primary_key=True, index=True, nullable=False)
    skill_id = Column(Integer, primary_key=True, index=True, nullable=False)
    