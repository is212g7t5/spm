from sqlalchemy import Column, ForeignKey, Integer, PrimaryKeyConstraint, String

from app.db.base_class import Base


class Learning_Journey_Course(Base):
    lj_id = Column(
        Integer, ForeignKey("learning_journey.lj_id"), index=True, nullable=False
    )
    course_id = Column(String, ForeignKey("course.course_id"), nullable=False)

    __table_args__ = (PrimaryKeyConstraint("lj_id", "course_id"),)
