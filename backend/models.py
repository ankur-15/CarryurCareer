# backend/models.py

from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, String

Base = declarative_base()


class JEECutoff(Base):
    __tablename__ = "jee_cutoffs"

    id = Column(Integer, primary_key=True, index=True)
    institute = Column(String)
    academic_program_name = Column(String)
    quota = Column(String)
    seat_type = Column(String)
    gender = Column(String)
    opening_rank = Column(Integer)
    closing_rank = Column(Integer)
    round = Column(Integer)
    year = Column(Integer)
