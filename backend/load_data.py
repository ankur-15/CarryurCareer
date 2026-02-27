import pandas as pd
from sqlalchemy import create_engine
from backend.database import DATABASE_URL

# Create engine
engine = create_engine(DATABASE_URL)

def load_csv_to_db(csv_path: str):
    print("Reading CSV...")
    df = pd.read_csv(csv_path)

    print("Cleaning column names...")

    # Rename columns to match model
    df = df.rename(columns={
        "Institute": "institute",
        "Academic Program Name": "academic_program_name",
        "Quota": "quota",
        "Seat Type": "seat_type",
        "Gender": "gender",
        "Opening Rank": "opening_rank",
        "Closing Rank": "closing_rank",
        "Round": "round",
        "Year": "year"
    })

    print("Inserting into database...")

    df.to_sql(
        name="jee_cutoffs",
        con=engine,
        if_exists="append",   # Don't replace table
        index=False,
        chunksize=5000        # Insert in batches
    )

    print("Data successfully inserted!")

if __name__ == "__main__":
    load_csv_to_db("merged_jee_cutoff_2018_2025.csv")
