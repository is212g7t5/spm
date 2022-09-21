from email.policy import default
from sqlalchemy import Column, Integer, String, Boolean

from app.db.base_class import Base

class Job(Base):
    job_id = Column(Integer, primary_key=True, index=True)
    job_name = Column(String, nullable=False)
    job_desc = Column(String)
    is_active = Column(Boolean, nullable=False, default=True)
    