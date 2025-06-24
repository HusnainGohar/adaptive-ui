from pydantic import BaseModel
from datetime import datetime, timedelta
from typing import Optional
from passlib.context import CryptContext

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User(BaseModel):
    id: int
    username: str
    password_hash: str
    role: str
    last_login: Optional[datetime] = None

# Hardcoded users (in production, this should be in a secure configuration file)
HARDCODED_USERS = [
    User(
        id=1,
        username="admin1",
        password_hash=pwd_context.hash("admin123"),
        role="admin"
    ),
    User(
        id=2,
        username="user1",
        password_hash=pwd_context.hash("user123"),
        role="user"
    ),
    User(
        id=3,
        username="user2",
        password_hash=pwd_context.hash("user234"),
        role="user"
    ),
    User(
        id=4,
        username="user3",
        password_hash=pwd_context.hash("user345"),
        role="user"
    ),
    User(
        id=5,
        username="user4",
        password_hash=pwd_context.hash("user456"),
        role="user"
    ),
    User(
        id=6,
        username="user5",
        password_hash=pwd_context.hash("user567"),
        role="user"
    ),
    User(
        id=7,
        username="user6",
        password_hash=pwd_context.hash("user678"),
        role="user"
    ),
    User(
        id=8,
        username="user7",
        password_hash=pwd_context.hash("user789"),
        role="user"
    ),
    User(
        id=9,
        username="user8",
        password_hash=pwd_context.hash("user890"),
        role="user"
    ),
    User(
        id=10,
        username="user9",
        password_hash=pwd_context.hash("user901"),
        role="user"
    )
]

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_user(username: str) -> Optional[User]:
    return next((user for user in HARDCODED_USERS if user.username == username), None)
