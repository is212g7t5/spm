from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, schemas
from app.api import deps
from app.core.config import settings

router = APIRouter()


@router.get("/all", response_model=List[schemas.Skill])
def get_all_skill(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
) -> Any:
    """
    Retrieve all skills.
    """
    skills = crud.skill.get_multi(db, skip=skip)
    return skills


@router.get("/{skill_id}", response_model=schemas.Skill)
def get_skill_by_id(
    skill_id: int,
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Get a specific skill by id.
    """
    skill = crud.skill.get(db, skill_id=skill_id)
    return skill


@router.post("", response_model=schemas.Skill)
def create_skill(
    *,
    db: Session = Depends(deps.get_db),
    skill_name: str = Body(...),
) -> Any:
    """
    Create new skill.
    """
    if not settings.USERS_OPEN_REGISTRATION:
        raise HTTPException(
            status_code=403,
            detail="Open staff registration is forbidden on this server",
        )
    skill_in = schemas.SkillCreate(
        skill_name=skill_name,
    )
    skill = crud.skill.create(db, obj_in=skill_in)
    return skill


@router.put("/{skill_id}", response_model=schemas.Skill)
def update_skill_by_id(
    *,
    db: Session = Depends(deps.get_db),
    skill_id: int,
    skill_name: str = Body(None),
) -> Any:
    """
    Update a skill.
    """
    skill = crud.skill.get(db, skill_id=skill_id)
    if not skill:
        raise HTTPException(
            status_code=404,
            detail="Skill not found",
        )
    skill_in = schemas.SkillCreate(
        skill_id=skill.skill_id,
        skill_name=skill_name or skill.skill_name,
    )
    skill = crud.skill.update(db, db_obj=skill, obj_in=skill_in)
    return skill


@router.delete("/{skill_id}", response_model=schemas.Skill)
def delete_skill_by_id(
    *,
    db: Session = Depends(deps.get_db),
    skill_id: int,
) -> Any:
    """
    Delete a skill.
    """
    skill = crud.skill.get(db, skill_id=skill_id)
    if not skill:
        raise HTTPException(
            status_code=404,
            detail="Skill not found",
        )
    skill = crud.skill.remove(db, skill_id=skill_id)
    return skill
