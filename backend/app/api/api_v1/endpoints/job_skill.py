from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, schemas
from app.api import deps

router = APIRouter()


@router.get("/all", response_model=List[schemas.JobSkill])
def get_all_job_skill(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
) -> Any:
    """
    Retrieve all job and their assigned skills. 
    One row -> one job, one skill
    """
    job_skill = crud.job_skill.get_multi(db, skip=skip)
    return job_skill


@router.get("/{job_id}", response_model=schemas.JobSkill)
def get_job_skill_by_id(
    job_id: int,
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Get a specific job and skill by their ids.
    """
    job_skill = crud.job_skill.get(db, job_id=job_id)
    return job_skill


@router.post("", response_model=schemas.JobSkill)
def create_job_skill(
    *,
    db: Session = Depends(deps.get_db),
    job_id: int,
    skill_id: int,
) -> Any:
    """
    Create a pair of job and skill.
    """
    job_skill = crud.job_skill.get(db, job_id=job_id, skill_id=skill_id)
    if job_skill:
        raise HTTPException(
            status_code=401, detail="Job has been assigned this skill in database"
        )
    job_skill_in = schemas.JobSkillCreate(
        job_id=job_id, 
        skill_id=skill_id,
    )
    job_skill = crud.job_skill.create(db, obj_in=job_skill_in)
    return job_skill


@router.put("/{job_id}&{skill_id}", response_model=schemas.JobSkill)
def update_job_skill_by_id(
    *,
    db: Session = Depends(deps.get_db),
    job_id: int, 
    skill_id: int,
) -> Any:
    """
    Update a combination of job and skill.
    """
    job_skill = crud.job_skill.get(db, job_id=job_id, skill_id=skill_id)
    if not job_skill:
        raise HTTPException(
            status_code=404,
            detail="Combination of Job and Skill not found",
        )
    job_skill_in = schemas.JobSkillCreate(
        skill_id=job_skill.skill_id,
        job_id=job_id or job_skill.job_id,
    )
    job_skill = crud.job_skill.update(db, db_obj=job_skill, obj_in=job_skill_in)
    return job_skill


@router.delete("/{job_id}&{skill_id}", response_model=schemas.JobSkill)
def delete_job_skill_by_id(
    *,
    db: Session = Depends(deps.get_db),
    job_id: int, 
    skill_id: int,
) -> Any:
    """
    Delete a combination of job and skill.
    """
    job_skill = crud.job_skill.get(db, job_id=job_id, skill_id=skill_id)
    if not job_skill:
        raise HTTPException(
            status_code=404,
            detail="Combination of job and skill not found",
        )
    job_skill = crud.job_skill.remove(db, job_id=job_id, skill_id=skill_id)
    return job_skill
