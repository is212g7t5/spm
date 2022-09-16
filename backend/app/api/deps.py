from typing import Generator

from fastapi.security import OAuth2PasswordBearer

from app.core.config import settings
from app.db.session import SessionLocal

reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/login/access-token"
)


def get_db() -> Generator:
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


# def get_current_client(
#     db: Session = Depends(get_db), token: str = Depends(reusable_oauth2)
# ) -> models.Client:
#     try:
#         payload = jwt.decode(
#             token, settings.SECRET_KEY, algorithms=[security.ALGORITHM]
#         )
#         token_data = schemas.TokenPayload(**payload)
#     except (jwt.JWTError, ValidationError):
#         raise HTTPException(
#             status_code=status.HTTP_403_FORBIDDEN,
#             detail="Could not validate credentials",
#         )
#     client = crud.client.get(db, id=token_data.id)
#     if not client:
#         raise HTTPException(status_code=404, detail="Client not found")
#     return client


# def get_current_active_client(
#     current_client: models.Client = Depends(get_current_client),
# ) -> models.Client:
#     if not crud.client.is_active(current_client):
#         raise HTTPException(status_code=400, detail="Inactive client")
#     return current_client


# def get_current_active_superuser(
#     current_user: models.User = Depends(get_current_user),
# ) -> models.User:
#     if not crud.user.is_superuser(current_user):
#         raise HTTPException(
#             status_code=400, detail="The user doesn't have enough privileges"
#         )
#     return current_user
