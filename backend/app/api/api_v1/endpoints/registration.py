from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, schemas
from app.api import deps
from app.core.config import settings

router = APIRouter()


@router.get("/all", response_model=List[schemas.Registration])
def get_all_registration(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
) -> Any:
    """
    Retrieve all registrations.
    """
    registrations = crud.registration.get_multi(db, skip=skip)
    return registrations


@router.get("/{reg_id}", response_model=schemas.Registration)
def get_registration_by_id(
    reg_id: int,
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Get a specific registration by id.
    """
    registration = crud.registration.get(db, reg_id=reg_id)
    return registration


@router.get(
    "/staff_and_course/{staff_id}&{course_id}", response_model=schemas.Registration
)
def get_registration_by_staff_and_course_id(
    staff_id: int,
    course_id: str,
    db: Session = Depends(deps.get_db),
) -> Any:
    registration = crud.registration.get_by_staff_and_course_id(
        db, staff_id=staff_id, course_id=course_id
    )
    if not registration:
        raise HTTPException(
            status_code=404,
            detail="Registration details under this staff and course not found",
        )
    return registration


@router.post("", response_model=schemas.Registration)
def create_registration(
    *,
    db: Session = Depends(deps.get_db),
    course_id: str = Body(...),
    staff_id: int = Body(...),
    reg_status: str = Body(...),
    completion_status: str = Body(...),
) -> Any:
    """
    Create new registration.
    """
    if not settings.USERS_OPEN_REGISTRATION:
        raise HTTPException(
            status_code=403,
            detail="Open staff registration is forbidden on this server",
        )
    registration_in = schemas.RegistrationCreate(
        course_id=course_id,
        staff_id=staff_id,
        reg_status=reg_status,
        completion_status=completion_status,
    )
    registration = crud.registration.create(db, obj_in=registration_in)
    return registration


@router.put("/{registration_id}", response_model=schemas.Registration)
def update_registration_by_id(
    *,
    db: Session = Depends(deps.get_db),
    reg_id: int,
    course_id: str = Body(...),
    staff_id: int = Body(...),
    reg_status: str = Body(...),
    completion_status: str = Body(...),
) -> Any:
    """
    Update a registration.
    """
    registration = crud.registration.get(db, reg_id=reg_id)
    if not registration:
        raise HTTPException(
            status_code=404,
            detail="Registration not found",
        )
    registration_in = schemas.RegistrationCreate(
        reg_id=registration.reg_id,
        course_id=course_id or registration.course_id,
        staff_id=staff_id or registration.staff_id,
        reg_status=reg_status or registration.reg_status,
        completion_status=completion_status or registration.completion_status,
    )
    registration = crud.registration.update(
        db, db_obj=registration, obj_in=registration_in
    )
    return registration


@router.delete("/{registration_id}", response_model=schemas.Registration)
def delete_registration_by_id(
    *,
    db: Session = Depends(deps.get_db),
    reg_id: int,
) -> Any:
    """
    Delete a registration.
    """
    registration = crud.registration.get(db, reg_id=reg_id)
    if not registration:
        raise HTTPException(
            status_code=404,
            detail="Registration not found",
        )
    registration = crud.registration.remove(db, reg_id=reg_id)
    return registration
