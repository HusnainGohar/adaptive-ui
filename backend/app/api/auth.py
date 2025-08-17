# routes/auth_router.py
from fastapi import APIRouter, Depends, HTTPException, status, Form
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional
from app.models.users import User, get_user, verify_password
from app.database import get_database
from email_validator import validate_email, EmailNotValidError
from passlib.context import CryptContext

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = "your-secret-key-here-change-in-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

router = APIRouter()

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def authenticate_user(username: str, password: str) -> Optional[User]:
    user = await get_user(username)
    if not user or not verify_password(password, user.password_hash):
        return None
    return user

async def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if not username:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = await get_user(username)
    if not user:
        raise credentials_exception
    return user

@router.post("/token", response_model=dict)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Update last_login in DB
    await get_database()["users"].update_one(
        {"username": user.username},
        {"$set": {"last_login": datetime.utcnow()}}
    )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )

    return {
    "access_token": access_token,
    "token_type": "bearer",
    "user": {
        "id": str(user.id),
        "username": user.username,
        "email": user.email,
        "full_name": user.full_name,
        "role": user.role
    }
}

@router.post("/register", response_model=dict)
async def register_user(
    username: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    full_name: str = Form(...)
):
    db = get_database()

    # Validate email format
    try:
        validate_email(email)
    except EmailNotValidError as e:
        raise HTTPException(status_code=400, detail=str(e))

    # Check for existing user
    existing_user = await db["users"].find_one({"$or": [
        {"username": username},
        {"email": email}
    ]})
    if existing_user:
        raise HTTPException(status_code=400, detail="Username or email already exists")

    # Hash password
    hashed_password = pwd_context.hash(password)

    # Create user document
    user_doc = {
        "username": username,
        "email": email,
        "full_name": full_name,
        "password_hash": hashed_password,
        "role": "user",
        "is_verified": True,
        "created_at": datetime.utcnow()
    }

    await db["users"].insert_one(user_doc)

    return {"message": "User registered successfully"}
