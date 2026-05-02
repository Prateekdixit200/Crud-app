from pydantic import BaseModel, EmailStr
from enum import Enum
from typing import Optional

class RoleEnum(str, Enum):
    EMPLOYEE = "EMPLOYEE"
    MANAGER = "MANAGER"

class UserCreate(BaseModel):
    email: str
    password : str
    full_name : str
    role: RoleEnum
    manager_id: Optional[int] = None

class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str
    role: RoleEnum
    manager_id: Optional[int] = None

    class Config:
        from_attributes = True