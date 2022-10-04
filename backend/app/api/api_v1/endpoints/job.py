from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import text
from sqlalchemy.orm import Session

from app import crud, schemas
from app.api import deps

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


@router.get("/skills")
def get_all_jobs_and_all_skills(
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Get all jobs and all their skills.
    """
    sql_query = text(
        """
    SELECT
        j.Job_ID as job_id,
        j.Job_Name as job_name,
        j.Job_Desc as job_desc,
        j.Is_Active as is_job_active,
        s.Skill_ID as skill_id,
        s.Skill_Name as skill_name,
        s.Skill_Desc as skill_desc,
        s.Is_Active as is_skill_active
    FROM job as j
    LEFT JOIN job_skill ON j.job_ID = job_skill.job_ID
    LEFT JOIN skill as s ON job_skill.Skill_ID = s.Skill_ID;
    """
    )
    db_cursor_obj = db.execute(sql_query)
    if not db_cursor_obj:
        raise HTTPException(
            status_code=404,
            detail="Error getting all jobs with their skills",
        )

    jobs_with_skills = db_cursor_obj.all()
    if not jobs_with_skills:
        raise HTTPException(
            status_code=404,
            detail="No jobs with skils in the database",
        )

    return jobs_with_skills


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
def create_job(*, db: Session = Depends(deps.get_db), job_in: schemas.JobCreate) -> Any:
    """
    Create new job.
    """
    job = crud.job.get_by_job_name(db, job_name=job_in.job_name)
    if job:
        raise HTTPException(
            status_code=409,
            detail="job_name already exists",
        )
    return crud.job.create(db, obj_in=job_in)


@router.put("/{job_id}", response_model=schemas.Job)
def update_job_by_id(
    *,
    db: Session = Depends(deps.get_db),
    job_id: int,
    job_in: schemas.JobUpdate,
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
    if job_in.job_name and crud.job.get_by_job_name(db, job_name=job_in.job_name):
        raise HTTPException(
            status_code=409,
            detail="job_name already exists",
        )
    return crud.job.update(db, db_obj=job, obj_in=job_in)


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
    return crud.job.remove(db, job_id=job_id)
