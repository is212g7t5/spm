from typing import Any, Dict, Union

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.course import Course
from app.schemas.course import CourseCreate, CourseUpdate


class CRUDCourse(CRUDBase[Course, CourseCreate, CourseUpdate]):
    def get(self, db: Session, course_id: Any) -> Course:
        return db.query(self.model).filter(self.model.course_id == course_id).first()

    def create(self, db: Session, *, obj_in: CourseCreate) -> Course:
        db_obj = Course(
            course_id=obj_in.course_id,
            course_name=obj_in.course_name,
            course_desc=obj_in.course_desc,
            course_status=obj_in.course_status,
            course_type=obj_in.course_type,
            course_category=obj_in.course_category,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self,
        db: Session,
        *,
        db_obj: Course,
        obj_in: Union[CourseUpdate, Dict[str, Any]],
    ) -> Course:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        return super().update(db, db_obj=db_obj, obj_in=update_data)

    def remove(self, db: Session, *, course_id: int) -> Course:
        obj = db.query(self.model).get(course_id)
        db.delete(obj)
        db.commit()
        return obj


course = CRUDCourse(Course)
