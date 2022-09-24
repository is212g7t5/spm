from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, schemas
from app.api import deps

router = APIRouter()


@router.get("/all", response_model=List[schemas.SkillCourse])
def get_all_skill_course(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
) -> Any:
    """
    Retrieve all skills and their assigned courses.
    One row -> one skill id, one course id
    """
    skill_course = crud.skill_course.get_multi(db, skip=skip)
    if not skill_course:
        raise HTTPException(
            status_code=404,
            detail="Skills and courses not found",
        )
    return skill_course


@router.get("/skills/{skill_id}", response_model=List[schemas.SkillCourse])
def get_skill_course_by_skill_id(
    skill_id: int, db: Session = Depends(deps.get_db), skip: int = 0
) -> Any:
    """
    Retrieve a specific skill with their courses.
    """
    skill_course = crud.skill_course.get_by_skill_id(db, skill_id=skill_id, skip=skip)
    if not skill_course:
        raise HTTPException(
            status_code=404,
            detail="Courses under this skill not found",
        )
    return skill_course


@router.get("/courses/{course_id}", response_model=List[schemas.SkillCourse])
def get_skill_course_by_course_id(
    course_id: str, db: Session = Depends(deps.get_db), skip: int = 0
) -> Any:
    """
    Retrieve a specific course with their skills.
    """
    skill_course = crud.skill_course.get_by_course_id(
        db, course_id=course_id, skip=skip
    )
    if not skill_course:
        raise HTTPException(
            status_code=404,
            detail="Skills under this course not found",
        )
    return skill_course


@router.post("", response_model=schemas.SkillCourse)
def create_skill_course(
    *,
    db: Session = Depends(deps.get_db),
    skill_id: int = Body(...),
    course_id: str = Body(...),
) -> Any:
    """
    Create a pair of skill and course.
    """
    skill_course = crud.skill_course.get(db, skill_id=skill_id, course_id=course_id)
    if skill_course:
        raise HTTPException(
            status_code=401, detail="Course has been assigned this skill in database"
        )
    skill_course_in = schemas.SkillCourseCreate(
        skill_id=skill_id,
        course_id=course_id,
    )
    skill_course = crud.skill_course.create(db, obj_in=skill_course_in)
    return skill_course


@router.delete("/{skill_id}&{course_id}", response_model=schemas.SkillCourse)
def delete_skill_course_by_id(
    *,
    db: Session = Depends(deps.get_db),
    skill_id: int,
    course_id: str,
) -> Any:
    """
    Delete a combination of skill and course.
    """
    skill_course = crud.skill_course.get(db, skill_id=skill_id, course_id=course_id)
    if not skill_course:
        raise HTTPException(
            status_code=404,
            detail="Combination of skill and course not found",
        )
    skill_course = crud.skill_course.remove(db, skill_id=skill_id, course_id=course_id)
    return skill_course
