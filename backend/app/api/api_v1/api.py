from app.api.api_v1.endpoints import (
    staff,
    # login,
)
from fastapi import APIRouter

api_router = APIRouter()
# api_router.include_router(login.router, tags=["login"])
api_router.include_router(staff.router, prefix="/staff", tags=["staff"])
