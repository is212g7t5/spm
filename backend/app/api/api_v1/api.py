from fastapi import APIRouter

from app.api.api_v1.endpoints import course, job, registration, role, staff, job_skill # login,

api_router = APIRouter()


@api_router.get("/")
def health_check():
    return "Backend is up and running!"


# api_router.include_router(login.router, tags=["login"])
api_router.include_router(role.router, prefix="/role", tags=["role"])
api_router.include_router(staff.router, prefix="/staff", tags=["staff"])
api_router.include_router(course.router, prefix="/course", tags=["course"])
api_router.include_router(
    registration.router, prefix="/registration", tags=["registration"]
)
api_router.include_router(job.router, prefix="/job", tags=["job"])
api_router.include_router(job_skill.router, prefix="/job_skill", tags=["job_skill"])
