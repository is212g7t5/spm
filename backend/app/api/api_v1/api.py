from fastapi import APIRouter

from app.api.api_v1.endpoints import (  # login,
    course,
    job,
    job_skill,
    learning_journey,
    learning_journey_course,
    registration,
    role,
    skill,
    skill_course,
    staff,
)

api_router = APIRouter()

# api_router.include_router(login.router, tags=["login"])
api_router.include_router(role.router, prefix="/role", tags=["role"])
api_router.include_router(staff.router, prefix="/staff", tags=["staff"])
api_router.include_router(course.router, prefix="/course", tags=["course"])
api_router.include_router(
    registration.router, prefix="/registration", tags=["registration"]
)
api_router.include_router(skill.router, prefix="/skill", tags=["skill"])
api_router.include_router(job.router, prefix="/job", tags=["job"])
api_router.include_router(job_skill.router, prefix="/job_skill", tags=["job_skill"])
api_router.include_router(
    skill_course.router, prefix="/skill_course", tags=["skill_course"]
)
api_router.include_router(
    learning_journey.router, prefix="/learning_journey", tags=["learning_journey"]
)
api_router.include_router(
    learning_journey_course.router,
    prefix="/learning_journey_course",
    tags=["learning_journey_course"],
)
