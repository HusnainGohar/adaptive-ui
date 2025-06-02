from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.persona import router as persona_router

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

app.include_router(persona_router)
