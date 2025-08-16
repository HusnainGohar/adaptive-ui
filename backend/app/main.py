from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from app.api.persona import router as persona_router
from app.api.categories import router as category_router
from app.api.products import router as product_router
from app.api.auth import router as auth_router
from app.api.auth import get_current_user
from app.api.models import User
from contextlib import asynccontextmanager
from app.database import get_db_client

@asynccontextmanager
async def lifespan(app: FastAPI):
    # --- startup ---
    client = get_db_client()
    await client.admin.command("ping")   # quick health check
    yield                                # server is now running
    # --- shutdown ---
    client.close()

app = FastAPI(lifespan=lifespan)

# Allow React dev server (adjust port if needed)
origins = ["*",
    "http://localhost:5173",  # Vite default
    "http://localhost:3000",  # CRA default
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all routers here
app.include_router(persona_router)
app.include_router(category_router)
app.include_router(product_router)


# Include authentication routes
app.include_router(auth_router, prefix="/auth", tags=["auth"])

@app.get("/users/me")
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
