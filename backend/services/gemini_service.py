import os
from google import genai
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY not found in environment variables.")

client = genai.Client(api_key=api_key)

SYSTEM_CONTEXT = """
You are an expert JEE career counselor for Indian engineering admissions.
Your job is to help students with:
- College and branch selection based on their JEE rank
- Understanding admission categories (OPEN, OBC, SC, ST, EWS)
- Career path guidance for different engineering branches
- Backup strategies and alternative options
- Long-term academic and career planning

Always be concise, realistic, and encouraging.
"""


def generate_ai_response(prompt: str) -> str:
    """
    Generate a career-focused AI response for a student query.
    """
    try:
        full_prompt = f"{SYSTEM_CONTEXT}\n\nStudent Query: {prompt}"

        response = client.models.generate_content(
            model="gemini-2.0-flash-lite",  # highest free tier quota
            contents=full_prompt,
        )

        return response.text

    except Exception as e:
        error_str = str(e)

        if "429" in error_str or "RESOURCE_EXHAUSTED" in error_str:
            return (
                "⚠️ The AI advisor has reached its daily quota limit. "
                "Please try again after midnight (IST), or contact the admin to enable billing. "
                "You can still use the College Predictor without AI advice in the meantime."
            )
        elif "API_KEY" in error_str or "api_key" in error_str:
            return "⚠️ AI service is not configured correctly. Please check the Gemini API key in your .env file."
        elif "404" in error_str or "not found" in error_str.lower():
            return "⚠️ AI model not available. Please check your Gemini SDK version."
        else:
            return "⚠️ AI service is temporarily unavailable. Please try again in a few minutes."