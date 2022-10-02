from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, schemas
from app.api import deps

router = APIRouter()


@router.get("/all", response_model=List[schemas.LJCourse])
def get_all_learning_journey_course(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
) -> Any:
    """
    Retrieve all courses under learning journeys.
    """
    learning_journey_course = crud.learning_journey_course.get_multi(db, skip=skip)
    if not learning_journey_course:
        raise HTTPException(
            status_code=404,
            detail="Courses under learning journeys not found",
        )
    return learning_journey_course


@router.get("/{lj_id}", response_model=List[schemas.LJCourse])
def get_all_learning_journey_course_by_lj_id(
    lj_id: int,
    db: Session = Depends(deps.get_db),
    skip: int = 0,
) -> Any:
    """
    Retrieve all courses under a learning journey.
    """
    learning_journey_course = crud.learning_journey_course.get_by_lj_id(
        db, lj_id=lj_id, skip=skip
    )
    if not learning_journey_course:
        raise HTTPException(
            status_code=404,
            detail="Courses under learning journey not found",
        )
    return learning_journey_course


@router.get(
    "/learning_journey_&_course/{lj_id}&{course_id}", response_model=schemas.LJCourse
)
def get_all_learning_journey_course_by_id(
    lj_id: int,
    course_id: str,
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Retrieve a specific course under a learning journey.
    """
    learning_journey = crud.learning_journey_course.get(
        db, lj_id=lj_id, course_id=course_id
    )
    if not learning_journey:
        raise HTTPException(
            status_code=404,
            detail="Course under learning journey not found",
        )
    return learning_journey


@router.post("", response_model=schemas.LJCourse)
def create_learning_journey_course(
    *,
    db: Session = Depends(deps.get_db),
    lj_id: int = Body(...),
    course_id: str = Body(...),
) -> Any:
    """
    Create learning journey course.
    """
    learning_journey_course = crud.learning_journey_course.get(
        db, lj_id=lj_id, course_id=course_id
    )
    if learning_journey_course:
        raise HTTPException(
            status_code=401,
            detail="Learning journey has been assigned this course in database",
        )
    learning_journey_course_in = schemas.LJCourseCreate(
        lj_id=lj_id,
        course_id=course_id,
    )
    learning_journey_course = crud.learning_journey_course.create(
        db, obj_in=learning_journey_course_in
    )
    return learning_journey_course


@router.delete("/{lj_id}&{course_id}", response_model=schemas.LJCourse)
def delete_learning_journey_course_by_id(
    *,
    db: Session = Depends(deps.get_db),
    lj_id: int,
    course_id: str,
) -> Any:
    """
    Delete a combination of learning journey and course.
    """
    learning_journey_course = crud.learning_journey_course.get(
        db, lj_id=lj_id, course_id=course_id
    )
    if not learning_journey_course:
        raise HTTPException(
            status_code=404,
            detail="Combination of learning journey and course not found",
        )
    learning_journey_course = crud.learning_journey_course.remove(
        db, lj_id=lj_id, course_id=course_id
    )
    return learning_journey_course
