from backend.services.gemini_service import generate_ai_response


def generate_ai_advice(rank: int, category: str, results: list) -> str:
    """
    Generate AI-powered career advice based on predicted colleges.
    Uses gemini_service (new SDK) instead of the old gemini_config.
    """

    if not results:
        return (
            f"No colleges were found for rank {rank} in category {category}. "
            "Consider checking a different category, gender filter, or year. "
            "You may also explore state-level counselling (JOSAA alternatives) or private colleges."
        )

    # Format top colleges for context (limit to 10 to keep prompt concise)
    top_colleges = results[:10]
    college_lines = "\n".join([
        f"- {r['institute']} | {r['branch']} | Closing Rank: {r['closing_rank']} | Chance: {r['chance']}"
        for r in top_colleges
    ])

    prompt = f"""
A student has the following JEE profile:
- Rank: {rank}
- Category: {category}
- Total colleges found: {len(results)}

Top predicted colleges and branches:
{college_lines}

Please provide:
1. A realistic assessment of their options
2. Top 3 recommended (institute + branch) combinations and why
3. Backup strategies if top choices don't work out
4. Long-term career outlook for the best-fit branches
Keep the advice concise, practical, and encouraging.
"""

    return generate_ai_response(prompt)