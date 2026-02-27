from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from backend.services.gemini_service import generate_ai_response

router = APIRouter()


class ChatRequest(BaseModel):
    message: str
    history: list[dict] = []  # Optional: list of {"role": "user/assistant", "content": "..."}


class ChatResponse(BaseModel):
    reply: str
    message_count: int


@router.post("/", response_model=ChatResponse)
def chat(request: ChatRequest):
    """
    Chat with Gemini AI career counselor.
    Optionally pass conversation history for context-aware replies.
    """

    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty.")

    # Build prompt with history context if provided
    if request.history:
        history_text = "\n".join([
            f"{msg['role'].capitalize()}: {msg['content']}"
            for msg in request.history
            if 'role' in msg and 'content' in msg
        ])
        full_prompt = f"Previous conversation:\n{history_text}\n\nStudent: {request.message}"
    else:
        full_prompt = request.message

    reply = generate_ai_response(full_prompt)

    return ChatResponse(
        reply=reply,
        message_count=len(request.history) + 1
    )