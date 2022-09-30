from typing import Any

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.learning_journey_course import Learning_Journey_Course
from app.schemas.learning_journey_course import LJCourseCreate, LJCourseUpdate


class CRUDLJCourse(CRUDBase[Learning_Journey_Course, LJCourseCreate, LJCourseUpdate]):
    def get(self, db: Session, lj_id: Any, course_id: Any) -> Learning_Journey_Course:
        return (
            db.query(self.model)
            .filter(self.model.lj_id == lj_id, self.model.course_id == course_id)
            .first()
        )

    def get_by_lj_id(
        self,
        db: Session,
        *,
        lj_id: Any,
        skip: int = 0,
        limit: int = 100,
        active_only: bool = False
    ) -> Learning_Journey_Course:
        return (
            db.query(self.model)
            .filter(self.model.lj_id == lj_id)
            .offset(skip)
            .limit(limit)
            .all()
        )

    def get_by_course_id(
        self,
        db: Session,
        *,
        course_id: Any,
        skip: int = 0,
        limit: int = 100,
        active_only: bool = False
    ) -> Learning_Journey_Course:
        return (
            db.query(self.model)
            .filter(self.model.course_id == course_id)
            .offset(skip)
            .limit(limit)
            .all()
        )

    def create(self, db: Session, *, obj_in: LJCourseCreate) -> Learning_Journey_Course:
        db_obj = Learning_Journey_Course(
            lj_id=obj_in.lj_id,
            course_id=obj_in.course_id,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def remove(
        self, db: Session, *, lj_id: int, course_id: str
    ) -> Learning_Journey_Course:
        obj = db.query(self.model).get((lj_id, course_id))
        db.delete(obj)
        db.commit()
        return obj


learning_journey_course = CRUDLJCourse(Learning_Journey_Course)
