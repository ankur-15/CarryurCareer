from fastapi import FastAPI
from backend.predictor import predict_colleges


app = FastAPI(title="CarryurCareer – Admission Predictor API")
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"status": "CarryurCareer API is running"}

@app.get("/predict")
def predict(rank: int, category: str):
    return {
        "rank": rank,
        "category": category.upper(),
        "results": predict_colleges(rank, category.upper())
    }
