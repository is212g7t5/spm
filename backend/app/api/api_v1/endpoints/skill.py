from typing import Any, List
import json #added
from fastapi import APIRouter, Body, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text #added
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
    if not skills:
        raise HTTPException(
            status_code=404,
            detail="Skills not found",
        )
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
    if not skill:
        raise HTTPException(
            status_code=404,
            detail="Skill not found",
        )
    return skill


@router.get("/courses")
def get_all_skills_and_all_courses(
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Get all jobs and all their skills.
    """
    sql_query = text(
        """
        SELECT
            s.skill_id, s.skill_name, s.skill_desc, s.is_active, sc.courses
        FROM
            skill s
            LEFT JOIN (
                SELECT
                    sc.skill_id,
                    JSON_ARRAYAGG(JSON_OBJECT(
                        'course_id', c.course_id,
                        'course_name', c.course_name,
                        'course_desc', c.course_desc,
                        'course_status', c.course_status,
                        'course_type', c.course_type,
                        'course_category', c.course_category
                    )) courses
                FROM skill_course sc, course c
                WHERE sc.course_id = c.course_id
                GROUP BY sc.skill_id
            ) sc ON s.skill_id = sc.skill_id;
    """
    )
    db_cursor_obj = db.execute(sql_query)
    if not db_cursor_obj:
        raise HTTPException(
            status_code=404,
            detail="Error getting all skills with their courses",
        )

    skills_with_courses = db_cursor_obj.all()
    if not skills_with_courses:
        raise HTTPException(
            status_code=404,
            detail="No skills with courses in the database",
        )

    skills_with_courses = [dict(r) for r in skills_with_courses]
    for row in skills_with_courses:
        row["courses"] = json.loads(row["courses"])

    return skills_with_courses


@router.post("", response_model=schemas.Skill)
def create_skill(
    *,
    db: Session = Depends(deps.get_db),
    skill_name: str = Body(...),
    skill_desc: str = Body(None),
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
        skill_desc=skill_desc,
        is_active=True,
    )
    skill = crud.skill.create(db, obj_in=skill_in)
    return skill


@router.put("/{skill_id}", response_model=schemas.Skill)
def update_skill_by_id(
    *,
    db: Session = Depends(deps.get_db),
    skill_id: int,
    skill_name: str = Body(None),
    skill_desc: str = Body(None),
    is_active: bool = Body(None),
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
        skill_desc=skill_desc or skill.skill_desc,
        is_active=is_active if is_active != None else skill.is_active,
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
