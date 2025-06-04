from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.persona import router as persona_router
from app.api.categories import router as category_router
from app.api.products import router as product_router

app = FastAPI()

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

