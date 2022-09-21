from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, schemas
from app.api import deps
from app.core.config import settings

router = APIRouter()


@router.get("/all", response_model=List[schemas.Role])
def get_all_role(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
) -> Any:
    """
    Retrieve all roles.
    """
    roles = crud.role.get_multi(db, skip=skip)
    if not roles:
        raise HTTPException(
            status_code=404,
            detail="Roles not found",
        )
    return roles


@router.get("/{role_id}", response_model=schemas.Role)
def get_role_by_id(
    role_id: int,
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Get a specific role by id.
    """
    role = crud.role.get(db, role_id=role_id)
    if not role:
        raise HTTPException(
            status_code=404,
            detail="Roles not found",
        )
    return role


@router.post("", response_model=schemas.Role)
def create_role(
    *,
    db: Session = Depends(deps.get_db),
    role_name: str = Body(None, embed=True),
) -> Any:
    """
    Create new role.
    """
    if not settings.USERS_OPEN_REGISTRATION:
        raise HTTPException(
            status_code=403,
            detail="Open staff registration is forbidden on this server",
        )
    role_in = schemas.RoleCreate(
        role_name=role_name,
    )
    role = crud.role.create(db, obj_in=role_in)
    return role


@router.put("/{role_id}", response_model=schemas.Role)
def update_role_by_id(
    *,
    db: Session = Depends(deps.get_db),
    role_id: int,
    role_name: str = Body(None, embed=True),
) -> Any:
    """
    Update a role.
    """
    role = crud.role.get(db, role_id=role_id)
    if not role:
        raise HTTPException(
            status_code=404,
            detail="Role not found",
        )
    role_in = schemas.RoleCreate(
        role_id=role.role_id,
        role_name=role_name or role.role_name,
    )
    role = crud.role.update(db, db_obj=role, obj_in=role_in)
    return role


@router.delete("/{role_id}", response_model=schemas.Role)
def delete_role_by_id(
    *,
    db: Session = Depends(deps.get_db),
    role_id: int,
) -> Any:
    """
    Delete a role.
    """
    role = crud.role.get(db, role_id=role_id)
    if not role:
        raise HTTPException(
            status_code=404,
            detail="Role not found",
        )
    role = crud.role.remove(db, role_id=role_id)
    return role
