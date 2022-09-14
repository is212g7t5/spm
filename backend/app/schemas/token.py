from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenPayload(BaseModel):
    id: Optional[int] = None
    exp: Optional[datetime] = None
    user_type: Optional[str] = None
