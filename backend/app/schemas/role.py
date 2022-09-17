from typing import Optional

from pydantic import BaseModel


# Shared properties
class RoleBase(BaseModel):
    role_id: Optional[int]
    role_name: str
    linked_skill: int #Skill ID foreign key


# Properties to receive via API on creation
class RoleCreate(RoleBase):
    pass


# Properties to receive via API on update
class RoleUpdate(RoleBase):
    pass


class RoleInDBBase(RoleBase):
    role_id: Optional[int] = None

    class Config:
        orm_mode = True


# Additional properties to return via API
class Role(RoleInDBBase):
    pass


# # Additional properties stored in DB
class RoleInDB(RoleInDBBase):
    pass
