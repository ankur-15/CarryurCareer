import pandas as pd
from pathlib import Path

DATA_PATH = Path(__file__).parent.parent / "data" / "jee_cutoffs.csv"

def predict_colleges(rank: int, category: str, exam="JEE"):
    df = pd.read_csv(DATA_PATH)

    df = df[
        (df["exam"] == exam) &
        (df["category"] == category)
    ]

    results = []

    for _, row in df.iterrows():
        if rank <= row["closing_rank"]:
            gap = row["closing_rank"] - rank

            if gap > 3000:
                chance = "High"
            elif gap > 1000:
                chance = "Medium"
            else:
                chance = "Low"

            results.append({
                "college": row["college"],
                "branch": row["branch"],
                "closing_rank": int(row["closing_rank"]),
                "chance": chance
            })

    return sorted(results, key=lambda x: x["closing_rank"])
