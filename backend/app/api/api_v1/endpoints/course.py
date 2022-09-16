from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, schemas
from app.api import deps

router = APIRouter()


@router.get("/all", response_model=List[schemas.Course])
def get_all_course(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
) -> Any:
    """
    Retrieve all courses.
    """
    courses = crud.course.get_multi(db, skip=skip)
    return courses


@router.get("/{course_id}", response_model=schemas.Course)
def get_course_by_id(
    course_id: str,
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Get a specific course by id.
    """
    course = crud.course.get(db, course_id=course_id)
    return course


@router.post("", response_model=schemas.Course)
def create_course(
    *,
    db: Session = Depends(deps.get_db),
    course_id: str = Body(...),
    course_name: str = Body(...),
    course_desc: str = Body(None),
    course_status: str = Body(None),
    course_type: str = Body(None),
    course_category: str = Body(None),
) -> Any:
    """
    Create new course.
    """
    course = crud.course.get(db, course_id=course_id)
    if course:
        raise HTTPException(
            status_code=401, detail="Course with course ID exists in database"
        )
    course_in = schemas.CourseCreate(
        course_id=course_id,
        course_name=course_name,
        course_desc=course_desc,
        course_status=course_status,
        course_type=course_type,
        course_category=course_category,
    )
    course = crud.course.create(db, obj_in=course_in)
    return course


@router.put("/{course_id}", response_model=schemas.Course)
def update_course_by_id(
    *,
    db: Session = Depends(deps.get_db),
    course_id: str,
    course_name: str = Body(None),
    course_desc: str = Body(None),
    course_status: str = Body(None),
    course_type: str = Body(None),
    course_category: str = Body(None),
) -> Any:
    """
    Update a course.
    """
    course = crud.course.get(db, course_id=course_id)
    if not course:
        raise HTTPException(
            status_code=404,
            detail="Course not found",
        )
    course_in = schemas.CourseCreate(
        course_id=course.course_id,
        course_name=course_name or course.course_name,
        course_desc=course_desc or course.course_desc,
        course_status=course_status or course.course_status,
        course_type=course_type or course.course_type,
        course_category=course_category or course.course_category,
    )
    course = crud.course.update(db, db_obj=course, obj_in=course_in)
    return course


@router.delete("/{course_id}", response_model=schemas.Course)
def delete_course_by_id(
    *,
    db: Session = Depends(deps.get_db),
    course_id: int,
) -> Any:
    """
    Delete a course.
    """
    course = crud.course.get(db, course_id=course_id)
    if not course:
        raise HTTPException(
            status_code=404,
            detail="Course not found",
        )
    course = crud.course.remove(db, course_id=course_id)
    return course
