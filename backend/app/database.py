import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()                       # pulls values from .env

client: AsyncIOMotorClient | None = None

def get_db_client() -> AsyncIOMotorClient:
    """Return shared global client."""
    global client
    if client is None:
        uri = os.getenv("MONGO_URI", "mongodb+srv://myAppUser:Shehla63@genertiveui.kcrrcfi.mongodb.net/?retryWrites=true&w=majority&appName=genertiveUI")
        client = AsyncIOMotorClient(uri)
    return client

def get_database():
    """Return the *database* object, not the client."""
    name = os.getenv("DB_NAME", "Ecommerce")
    return get_db_client()[name]