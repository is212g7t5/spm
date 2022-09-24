from typing import Any

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.skill_course import Skill_Course
from app.schemas.skill_course import SkillCourseCreate, SkillCourseUpdate


class CRUDSkillCourse(CRUDBase[Skill_Course, SkillCourseCreate, SkillCourseUpdate]):
    def get(self, db: Session, skill_id: Any, course_id: Any) -> Skill_Course:
        return (
            db.query(self.model)
            .filter(self.model.skill_id == skill_id, self.model.course_id == course_id)
            .first()
        )

    def get_by_skill_id(self, db: Session, skill_id: Any) -> Skill_Course:
        return db.query(self.model).filter(self.model.skill_id == skill_id).first()

    def get_by_course_id(self, db: Session, course_id: Any) -> Skill_Course:
        return db.query(self.model).filter(self.model.course_id == course_id).first()

    def create(self, db: Session, *, obj_in: SkillCourseCreate) -> Skill_Course:
        db_obj = Skill_Course(
            skill_id=obj_in.skill_id,
            course_id=obj_in.course_id,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def remove(self, db: Session, *, skill_id: int, course_id: str) -> Skill_Course:
        obj = db.query(self.model).get((skill_id, course_id))
        db.delete(obj)
        db.commit()
        return obj


skill_course = CRUDSkillCourse(Skill_Course)
