from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, schemas
from app.api import deps
from app.core.config import settings

router = APIRouter()

@router.get("/all", response_model=List[schemas.Job])
def get_all_job(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
) -> Any:
    """
    Retrieve all jobs.
    """
    jobs = crud.job.get_multi(db, skip=skip)
    if not jobs:
        raise HTTPException(
            status_code=404,
            detail="Jobs not found",
        )
    return jobs

@router.get("/{job_id}", response_model=schemas.Job)
def get_job_by_id(
    job_id: int,
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Get a specific job by id.
    """
    job = crud.job.get(db, job_id=job_id)
    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found",
        )
    return job

@router.post("", response_model=schemas.Job)
def create_job(
    *,
    db: Session = Depends(deps.get_db),
    job_name: str = Body(...),
    job_desc: str = Body(None),
) -> Any:
    """
    Create new job.
    """
    if not settings.USERS_OPEN_REGISTRATION:
        raise HTTPException(
            status_code=403,
            detail="Open staff registration is forbidden on this server",
        )
    job_in = schemas.JobCreate(
        job_name=job_name,
        job_desc=job_desc,
        is_active=True,
    )
    job = crud.job.create(db, obj_in=job_in)
    return job

@router.put("/{job_id}", response_model=schemas.Job)
def update_job_by_id(
    *,
    db: Session = Depends(deps.get_db),
    job_id: int,
    job_name: str = Body(None),
    job_desc: str = Body(None),
    is_active: bool = Body(None)
) -> Any:
    """
    Update a job.
    """
    job = crud.job.get(db, job_id=job_id)
    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found",
        )
    job_in = schemas.JobCreate(
        job_id=job.job_id,
        job_name=job_name or job.job_name,
        job_desc=job_desc or job.job_desc,
        is_active=is_active if is_active != None else job.is_active
    )
    job = crud.job.update(db, db_obj=job, obj_in=job_in)
    return job

@router.delete("/{job_id}", response_model=schemas.Job)
def delete_job_by_id(
    *,
    db: Session = Depends(deps.get_db),
    job_id: int,
) -> Any:
    """
    Delete a job.
    """
    job = crud.job.get(db, job_id=job_id)
    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found",
        )
    job = crud.job.remove(db, job_id=job_id)
    return job
    