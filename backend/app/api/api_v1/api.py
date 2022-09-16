from fastapi import APIRouter

from app.api.api_v1.endpoints import course, registration, role, staff  # login,

api_router = APIRouter()
# api_router.include_router(login.router, tags=["login"])
api_router.include_router(role.router, prefix="/role", tags=["role"])
api_router.include_router(staff.router, prefix="/staff", tags=["staff"])
api_router.include_router(course.router, prefix="/course", tags=["course"])
api_router.include_router(
    registration.router, prefix="/registration", tags=["registration"]
)
