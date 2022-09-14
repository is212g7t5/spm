from datetime import date
from typing import Any, List
from xmlrpc.client import Boolean

from pydantic.networks import EmailStr
from sqlalchemy.orm import Session

from app import crud, schemas
from app.api import deps
from app.core.config import settings
from fastapi import APIRouter, Body, Depends, HTTPException

router = APIRouter()


@router.get("/all", response_model=List[schemas.Staff])
def get_all_staff(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    active_only: bool = True,
    # current_staff: models.Staff = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Retrieve all staffs.
    """
    staffs = crud.staff.get_multi(db, skip=skip, limit=limit, active_only=active_only)
    return staffs


# @router.get("", response_model=schemas.Client)
# def get_client(
#     db: Session = Depends(deps.get_db),
#     current_client: models.Client = Depends(deps.get_current_active_client),
# ) -> Any:
#     """
#     Get current client.
#     """
#     return current_client


@router.get("/{staff_id}", response_model=schemas.Staff)
def get_staff_by_id(
    staff_id: int,
    # current_staff: models.Staff = Depends(deps.get_current_active_staff),
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Get a specific staff by id.
    """
    staff = crud.staff.get(db, id=staff_id)
    # if staff == current_staff:
    #     return staff
    # if not crud.staff.is_superuser(current_staff):
    #     raise HTTPException(
    #         status_code=400, detail="The current staff doesn't have enough privileges"
    #     )
    return staff


@router.post("", response_model=schemas.Staff)
def create_staff(
    *,
    db: Session = Depends(deps.get_db),
    staff_fname: str = Body(...),
    staff_lname: str = Body(...),
    dept: str = Body(...),
    email: EmailStr = Body(...),
    role: int = Body(...),
) -> Any:
    """
    Create new staff without the need to be logged in.
    """
    if not settings.USERS_OPEN_REGISTRATION:
        raise HTTPException(
            status_code=403,
            detail="Open staff registration is forbidden on this server",
        )
    staff_in = schemas.StaffCreate(
        staff_fname=staff_fname,
        staff_lname=staff_lname,
        dept=dept,
        email=email,
        role=role,
    )
    staff = crud.staff.create(db, obj_in=staff_in)
    return staff


@router.put("/{staff_id}", response_model=schemas.Staff)
def update_staff_by_id(
    *,
    db: Session = Depends(deps.get_db),
    staff_id: int,
    staff_fname: str = Body(None),
    staff_lname: str = Body(None),
    dept: str = Body(None),
    email: EmailStr = Body(None),
    role: int = Body(None),
    # current_staff: models.Staff = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Update a staff.
    """
    staff = crud.staff.get(db, id=staff_id)
    staff_in = schemas.StaffCreate(
        staff_fname=staff_fname or staff.staff_fname,
        staff_lname=staff_lname or staff.staff_lname,
        dept=dept or staff.dept,
        email=email or staff.email,
        role=role or staff.role,
    )
    staff = crud.staff.update(db, db_obj=staff, obj_in=staff_in)
    return staff

@router.delete("/{staff_id}", response_model=schemas.Staff)
def delete_staff_by_id(
    *,
    db: Session = Depends(deps.get_db),
    staff_id: int,
    # current_staff: models.Staff = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Delete a staff.
    """
    staff = crud.staff.get(db, id=staff_id)
    if not staff:
        raise HTTPException(
            status_code=404,
            detail="Staff not found",
        )
    staff = crud.staff.remove(db, id=staff_id)
    return staff

