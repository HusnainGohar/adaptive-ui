# models/users.py
from pydantic import BaseModel, Field
from typing import Optional
from bson import ObjectId
from datetime import datetime
from passlib.context import CryptContext
from app.database import get_database

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class PyObjectId(ObjectId):
    @classmethod
    def __get_pydantic_core_schema__(cls, source_type, handler):
        from pydantic_core import core_schema
        return core_schema.with_info_before_validator_function(
            cls.validate,
            core_schema.str_schema(),
        )
    @classmethod
    def validate(cls, v, info=None):
        if isinstance(v, ObjectId):
            return str(v)
        if isinstance(v, str) and ObjectId.is_valid(v):
            return v
        raise ValueError("Invalid ObjectId")

class User(BaseModel):
    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
        "json_encoders": {ObjectId: str}
    }

    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    username: str
    email: str
    password_hash: str
    role: str
    full_name: Optional[str] = None
    last_login: Optional[datetime] = None
    stats: Optional[dict] = None
    is_verified: bool = True  # Always true since no OTP
    created_at: Optional[datetime] = None

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

async def get_user(username: str) -> Optional[User]:
    user_doc = await get_database()["users"].find_one({"username": username})
    return User(**user_doc) if user_doc else None
