from sqlalchemy.orm import Session
from backend.models import JEECutoff


def get_chance(closing_rank: int, student_rank: int) -> str:
    """
    Determine admission chance based on gap between closing rank and student rank.
    Larger gap = higher chance (student rank is well within the cutoff).
    """
    gap = closing_rank - student_rank
    if gap > 3000:
        return "High"
    elif gap > 1000:
        return "Medium"
    else:
        return "Low"


def predict_colleges(
    db: Session,
    rank: int,
    category: str,
    gender: str,
    year: int
) -> list[dict]:
    """
    Fetch colleges where closing_rank >= student rank,
    filtered by category, gender, and year.
    Returns a serializable list of dicts.
    """

    results = (
        db.query(JEECutoff)
        .filter(
            JEECutoff.year == year,
            JEECutoff.seat_type == category,
            JEECutoff.gender == gender,
            JEECutoff.closing_rank >= rank
        )
        .order_by(JEECutoff.closing_rank.asc())
        .limit(50)
        .all()
    )

    # ✅ Serialize ORM objects to plain dicts (fixes JSON serialization error)
    return [
        {
            "institute": r.institute,
            "branch": r.academic_program_name,
            "quota": r.quota,
            "seat_type": r.seat_type,
            "gender": r.gender,
            "opening_rank": r.opening_rank,
            "closing_rank": r.closing_rank,
            "round": r.round,
            "year": r.year,
            "chance": get_chance(r.closing_rank, rank)
        }
        for r in results
    ]