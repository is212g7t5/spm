from sqlalchemy import Column, ForeignKey, Integer, PrimaryKeyConstraint, String

from app.db.base_class import Base


class Skill_Course(Base):
    skill_id = Column(Integer, ForeignKey("skill.skill_id"), nullable=False)
    course_id = Column(
        String, ForeignKey("course.course_id"), index=True, nullable=False
    )

    __table_args__ = (PrimaryKeyConstraint("skill_id", "course_id"),)
