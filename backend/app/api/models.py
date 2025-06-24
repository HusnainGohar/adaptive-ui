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
    stats: Optional[dict] = None

# Hardcoded users (in production, this should be in a secure configuration file)
HARDCODED_USERS = [
    User(
        id=1,
        username="admin1",
        password_hash=pwd_context.hash("admin123"),
        role="admin",
    ),
    User(
        id=2,
        username="user1",
        password_hash=pwd_context.hash("user123"),
        role="user",
        stats={
            "brand_research": 180,
            "brand_visits": 96,
            "cart_adds": 21,
            "deals_clicked": 23,
            "eco_products_viewed": 17,
            "gift_guides_viewed": 13,
            "products_viewed": 480,
            "purchases": 41,
            "quick_purchases": 1,
            "repeat_purchases": 11,
            "reviews_read": 5,
            "searches": 46,
            "specs_viewed": 48
        }
    ),
    User(
        id=3,
        username="user2",
        password_hash=pwd_context.hash("user234"),
        role="user",
        stats={
            "brand_research": 74,
            "brand_visits": 67,
            "cart_adds": 1,
            "deals_clicked": 40,
            "eco_products_viewed": 1,
            "gift_guides_viewed": 4,
            "products_viewed": 376,
            "purchases": 24,
            "quick_purchases": 4,
            "repeat_purchases": 20,
            "reviews_read": 4,
            "searches": 6,
            "specs_viewed": 21,
            "wishlists": 3
        }
    ),
    User(
        id=4,
        username="user3",
        password_hash=pwd_context.hash("user345"),
        role="user",
        stats={
            "brand_research": 5,
            "brand_visits": 30,
            "cart_adds": 46,
            "deals_clicked": 5,
            "eco_products_viewed": 33,
            "gift_guides_viewed": 5,
            "products_viewed": 184,
            "purchases": 2,
            "quick_purchases": 4,
            "repeat_purchases": 2,
            "reviews_read": 21,
            "searches": 36,
            "specs_viewed": 34,
            "wishlists": 30
        }
    ),
    User(
        id=5,
        username="user4",
        password_hash=pwd_context.hash("user456"),
        role="user",
        stats={
            "brand_research": 20,
            "brand_visits": 79,
            "cart_adds": 19,
            "deals_clicked": 50,
            "eco_products_viewed": 39,
            "gift_guides_viewed": 34,
            "products_viewed": 93,
            "purchases": 36,
            "quick_purchases": 10,
            "repeat_purchases": 10,
            "reviews_read": 18,
            "searches": 23,
            "specs_viewed": 8,
            "wishlists": 17
        }
    ),
    User(
        id=6,
        username="user5",
        password_hash=pwd_context.hash("user567"),
        role="user",
        stats={
            "brand_research": 44,
            "brand_visits": 13,
            "cart_adds": 50,
            "deals_clicked": 2,
            "eco_products_viewed": 42,
            "gift_guides_viewed": 41,
            "products_viewed": 448,
            "purchases": 9,
            "quick_purchases": 18,
            "repeat_purchases": 5,
            "reviews_read": 23,
            "searches": 6,
            "specs_viewed": 23,
            "wishlists": 31
        }
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
