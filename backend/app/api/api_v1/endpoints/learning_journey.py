from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, schemas
from app.api import deps
from app.core.config import settings

router = APIRouter()


@router.get("/all", response_model=List[schemas.LJ])
def get_all_learning_journey(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
) -> Any:
    """
    Retrieve all learning journeys.
    """
    learning_journey = crud.learning_journey.get_multi(db, skip=skip)
    if not learning_journey:
        raise HTTPException(
            status_code=404,
            detail="Learning journeys not found",
        )
    return learning_journey


@router.get("/{lj_id}", response_model=schemas.LJ)
def get_learning_journey_by_lj_id(
    lj_id: int,
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Get a specific learning journey by learning journey id.
    """
    learning_journey = crud.learning_journey.get(db, lj_id=lj_id)
    if not learning_journey:
        raise HTTPException(
            status_code=404,
            detail="Learning journey not found",
        )
    return learning_journey


@router.get("/Staff/{staff_id}", response_model=List[schemas.LJ])
def get_learning_journey_by_staff_id(
    staff_id: int, db: Session = Depends(deps.get_db), skip: int = 0
) -> Any:
    """
    Retrieve a specific staff id with its learning journeys.
    """
    learning_journey = crud.learning_journey.get_by_staff_id(
        db, staff_id=staff_id, skip=skip
    )
    if not learning_journey:
        raise HTTPException(
            status_code=404,
            detail="Learning journeys under this staff not found",
        )
    return learning_journey


@router.get("/Staff_and_Job/{staff_id}&{job_id}", response_model=List[schemas.LJ])
def get_learning_journey_by_staff_and_job_id(
    staff_id: int, job_id: int, db: Session = Depends(deps.get_db), skip: int = 0
) -> Any:
    """
    Retrieve a specific combination of job id and staff id with its learning journeys.
    """
    learning_journey = crud.learning_journey.get_by_staff_and_job_id(
        db, staff_id=staff_id, job_id=job_id, skip=skip
    )
    if not learning_journey:
        raise HTTPException(
            status_code=404,
            detail="Learning journeys under this staff and job not found",
        )
    return learning_journey


@router.post("", response_model=schemas.LJ)
def create_learning_journey(
    *,
    db: Session = Depends(deps.get_db),
    staff_id: int = Body(...),
    job_id: int = Body(...),
) -> Any:
    """
    Create new learning journey.
    """
    if not settings.USERS_OPEN_REGISTRATION:
        raise HTTPException(
            status_code=403,
            detail="Open staff registration is forbidden on this server",
        )
    lj_in = schemas.LJCreate(
        staff_id=staff_id,
        job_id=job_id,
    )
    learning_journey = crud.learning_journey.create(db, obj_in=lj_in)
    return learning_journey


@router.delete("/{lj_id}", response_model=schemas.LJ)
def delete_learning_journey_by_id(
    *,
    db: Session = Depends(deps.get_db),
    lj_id: int,
) -> Any:
    """
    Delete a learning journey.
    """
    learning_journey = crud.learning_journey.get(db, lj_id=lj_id)
    if not learning_journey:
        raise HTTPException(
            status_code=404,
            detail="Learning journey not found",
        )
    learning_journey = crud.learning_journey.remove(db, lj_id=lj_id)
    return learning_journey
