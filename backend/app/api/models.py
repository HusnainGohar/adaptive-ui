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
            "specs_viewed": 48,
            "wishlists": 8
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
            "brand_research": 15,
            "brand_visits": 20,
            "cart_adds": 5,
            "deals_clicked": 2,
            "eco_products_viewed": 10,
            "gift_guides_viewed": 3,
            "products_viewed": 150,
            "purchases": 12,
            "quick_purchases": 1,
            "repeat_purchases": 8,
            "reviews_read": 150,
            "searches": 120,
            "specs_viewed": 30,
            "wishlists": 15
        }
    ),
    User(
        id=7,
        username="user6",
        password_hash=pwd_context.hash("user678"),
        role="user",
        stats={
            "brand_research": 5,
            "brand_visits": 10,
            "cart_adds": 30,
            "deals_clicked": 150,
            "eco_products_viewed": 5,
            "gift_guides_viewed": 2,
            "products_viewed": 200,
            "purchases": 25,
            "quick_purchases": 5,
            "repeat_purchases": 3,
            "reviews_read": 10,
            "searches": 180,
            "specs_viewed": 10,
            "wishlists": 5
        }
    ),
    User(
        id=8,
        username="user7",
        password_hash=pwd_context.hash("user789"),
        role="user",
        stats={
            "brand_research": 30,
            "brand_visits": 25,
            "cart_adds": 8,
            "deals_clicked": 3,
            "eco_products_viewed": 15,
            "gift_guides_viewed": 5,
            "products_viewed": 200,
            "purchases": 20,
            "quick_purchases": 2,
            "repeat_purchases": 10,
            "reviews_read": 15,
            "searches": 150,
            "specs_viewed": 50,
            "wishlists": 10
        }
    ),
    User(
        id=9,
        username="user8",
        password_hash=pwd_context.hash("user890"),
        role="user",
        stats={
            "brand_research": 8,
            "brand_visits": 15,
            "cart_adds": 12,
            "deals_clicked": 8,
            "eco_products_viewed": 25,
            "gift_guides_viewed": 8,
            "products_viewed": 120,
            "purchases": 8,
            "quick_purchases": 1,
            "repeat_purchases": 2,
            "reviews_read": 12,
            "searches": 45,
            "specs_viewed": 15,
            "wishlists": 8
        }
    ),
    User(
        id=10,
        username="user9",
        password_hash=pwd_context.hash("user901"),
        role="user",
        stats={
            "brand_research": 18,
            "brand_visits": 12,
            "cart_adds": 2,
            "deals_clicked": 1,
            "eco_products_viewed": 0,
            "gift_guides_viewed": 0,
            "products_viewed": 28,
            "purchases": 3,
            "quick_purchases": 0,
            "repeat_purchases": 2,
            "reviews_read": 6,
            "searches": 20,
            "specs_viewed": 25,
            "wishlists": 3
        }
    ),
    User(
        id=11,
        username="tech_user",
        password_hash=pwd_context.hash("tech123"),
        role="user",
        stats={
            "brand_research": 15,
            "brand_visits": 8,
            "cart_adds": 3,
            "deals_clicked": 2,
            "eco_products_viewed": 1,
            "gift_guides_viewed": 0,
            "products_viewed": 25,
            "purchases": 2,
            "quick_purchases": 0,
            "repeat_purchases": 1,
            "reviews_read": 8,
            "searches": 18,
            "specs_viewed": 22,
            "wishlists": 4
        }
    )
]

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_user(username: str) -> Optional[User]:
    return next((user for user in HARDCODED_USERS if user.username == username), None)
