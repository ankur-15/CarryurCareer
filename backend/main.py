from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routes import prediction
from backend.routes import chatbot

from backend.database import engine
from backend.models import Base

# -----------------------------
# Create FastAPI App
# -----------------------------
app = FastAPI(
    title="CarryurCareer API",
    description="JEE Cutoff Intelligence + Gemini AI Career Assistant",
    version="2.0.0"
)

# -----------------------------
# Create DB Tables (DEV ONLY)
# -----------------------------
Base.metadata.create_all(bind=engine)

# -----------------------------
# CORS (restrict in production)
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # ← your React dev URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# -----------------------------
# Include Routers
# -----------------------------
app.include_router(
    prediction.router,
    prefix="/predict",
    tags=["Prediction"]
)

app.include_router(
    chatbot.router,
    prefix="/chat",
    tags=["Gemini AI Chatbot"]
)

# -----------------------------
# Health Check
# -----------------------------
@app.get("/")
def root():
    return {
        "status": "running",
        "project": "CarryurCareer",
        "version": "2.0",
        "ai_model": "Gemini 2.0 Flash"
    }