from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import engine, Base

from app.models.user_model import User
from app.models.preview_model import Preview

from app.routers.auth import router as auth_router
from app.routers.preview import router as preview_router

app = FastAPI(title="URL Preview API")

# Database Tables
Base.metadata.create_all(bind=engine)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(auth_router)
app.include_router(preview_router)


@app.get("/")
def home():
    return {
        "message": "Backend is running successfully!"
    }