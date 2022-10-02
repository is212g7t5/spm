from sqlalchemy import Column, ForeignKey, Integer

from app.db.base_class import Base


class Learning_Journey(Base):
    lj_id = Column(Integer, primary_key=True, index=True)
    staff_id = Column(Integer, ForeignKey("staff.staff_id"), nullable=False)
    job_id = Column(Integer, ForeignKey("job.job_id"), nullable=False)
