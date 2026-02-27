from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.services.prediction_service import predict_colleges
from backend.gemini_bot import generate_ai_advice

router = APIRouter()

VALID_CATEGORIES = {"OPEN", "OBC-NCL", "SC", "ST", "EWS", "OPEN (PwD)", "OBC-NCL (PwD)"}
VALID_GENDERS = {"Gender-Neutral", "Female-only (including Supernumerary)"}


@router.get("/")
def get_prediction(
    rank: int = Query(..., gt=0, description="Student's JEE rank (must be positive)"),
    category: str = Query(..., description="Seat type e.g. OPEN, OBC-NCL, SC, ST, EWS"),
    gender: str = Query(..., description="Gender-Neutral or Female-only (including Supernumerary)"),
    year: int = Query(..., ge=2018, le=2025, description="Year of cutoff data (2018–2025)"),
    include_advice: bool = Query(False, description="Set true to get Gemini AI career advice"),
    db: Session = Depends(get_db)
):
    # ✅ Validate category
    if category.upper() not in VALID_CATEGORIES:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid category '{category}'. Valid options: {sorted(VALID_CATEGORIES)}"
        )

    # ✅ Validate gender
    if gender not in VALID_GENDERS:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid gender '{gender}'. Valid options: {sorted(VALID_GENDERS)}"
        )

    # ✅ Fetch predictions
    results = predict_colleges(
        db=db,
        rank=rank,
        category=category.upper(),
        gender=gender,
        year=year
    )

    if not results:
        raise HTTPException(
            status_code=404,
            detail=f"No colleges found for rank {rank}, category {category}, gender {gender}, year {year}. Try adjusting your filters."
        )

    response = {
        "rank": rank,
        "category": category.upper(),
        "gender": gender,
        "year": year,
        "total_results": len(results),
        "data": results
    }

    # ✅ Optionally include Gemini AI advice
    if include_advice:
        response["ai_advice"] = generate_ai_advice(rank, category.upper(), results)

    return response