from fastapi import FastAPI
from predictor import predict_colleges

app = FastAPI(title="CarryurCareer – Admission Predictor API")

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
