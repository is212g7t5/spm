from sqlalchemy import Column, ForeignKey, Integer, PrimaryKeyConstraint

from app.db.base_class import Base


class Job_Skill(Base):
    job_id = Column(Integer, ForeignKey("job.job_id"), index=True, nullable=False)
    skill_id = Column(Integer, ForeignKey("skill.skill_id"), nullable=False)

    __table_args__ = (PrimaryKeyConstraint("job_id", "skill_id"),)
