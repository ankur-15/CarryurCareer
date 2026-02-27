# 🎓 CarryurCareer — JEE College Prediction Platform

A full-stack web application that helps JEE aspirants find their best-fit colleges using **7 years of real cutoff data (2018–2025)**, powered by **Gemini AI** for personalised career guidance.

---

## 📸 Screenshots

<img width="1899" height="800" alt="Screenshot 2026-02-28 021321" src="https://github.com/user-attachments/assets/623a7b14-5bd3-4310-81d3-ed827bd07928" />
<img width="1896" height="895" alt="Screenshot 2026-02-28 021354" src="https://github.com/user-attachments/assets/40179d43-7ae1-415c-94ce-79030fbfecb3" />
<img width="1889" height="888" alt="Screenshot 2026-02-28 021414" src="https://github.com/user-attachments/assets/5aa082c9-7df3-4f33-8253-a6c89e408806" />
<img width="1894" height="892" alt="Screenshot 2026-02-28 021434" src="https://github.com/user-attachments/assets/3a618259-18f3-47af-849e-e274901e6f51" />


---

## ✨ Features

- 🎯 **Smart College Prediction** — Matches your JEE rank against real cutoff data filtered by category, gender, and year
- 📊 **Admission Probability** — Each result is tagged as High / Medium / Low chance based on rank gap analysis
- 🤖 **Gemini AI Career Advice** — Get personalised college and branch recommendations powered by Google Gemini
- 💬 **AI Chat Counselor** — Multi-turn conversational AI for JEE-related career queries
- 📅 **2018–2025 Data** — Covers all rounds, institutes, quotas, and seat types from JEE Mains counselling
- ⚡ **Fast & Responsive** — React.js frontend with a clean, professional UI

---

## 🛠 Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Python 3.11 | Core language |
| FastAPI | REST API framework |
| PostgreSQL | Database |
| SQLAlchemy | ORM |
| Google GenAI SDK | Gemini AI integration |
| python-dotenv | Environment config |
| Uvicorn | ASGI server |

### Frontend
| Technology | Purpose |
|---|---|
| React.js (Vite) | UI framework |
| JavaScript (ES6+) | Frontend logic |
| CSS-in-JS | Styling |

---

## 📁 Project Structure

```
CarryurCareer/
├── backend/
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── prediction.py       # /predict endpoint
│   │   └── chatbot.py          # /chat endpoint
│   ├── services/
│   │   ├── __init__.py
│   │   ├── prediction_service.py   # DB query + chance logic
│   │   └── gemini_service.py       # Gemini AI integration
│   ├── __init__.py
│   ├── database.py             # SQLAlchemy engine + session
│   ├── models.py               # JEECutoff ORM model
│   ├── gemini_bot.py           # AI advice generator
│   ├── load_data.py            # CSV → PostgreSQL loader
│   └── main.py                 # FastAPI app entry point
├── frontend/
│   ├── src/
│   │   ├── App.jsx             # Full React SPA (4 pages)
│   │   └── main.jsx
│   ├── public/
│   └── package.json
├── data/
│   └── merged_jee_cutoff_2018_2025.csv
├── requirements.txt
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.9+
- Node.js 18+
- PostgreSQL
- Gemini API Key → [Get one here](https://ai.google.dev)

---

### 1. Clone the Repository

```bash
git clone https://github.com/ankur-15/CarryurCareer.git
cd CarryurCareer
```

---

### 2. Backend Setup

```bash
# Install Python dependencies
pip install -r requirements.txt
```

Create a `.env` file inside the `backend/` folder:

```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/carryurcareer
GEMINI_API_KEY=your_gemini_api_key_here
```

Load JEE cutoff data into PostgreSQL:

```bash
python -m backend.load_data
```

Start the backend server:

```bash
uvicorn backend.main:app --reload
```

Backend runs at → `http://127.0.0.1:8000`
API Docs available at → `http://127.0.0.1:8000/docs`

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at → `http://localhost:5173`

---

## 📡 API Endpoints

### College Prediction
```
GET /predict/?rank=5000&category=OPEN&gender=Gender-Neutral&year=2024&include_advice=false
```

| Parameter | Type | Example |
|---|---|---|
| `rank` | int | `5000` |
| `category` | string | `OPEN`, `OBC-NCL`, `SC`, `ST`, `EWS` |
| `gender` | string | `Gender-Neutral`, `Female-only (including Supernumerary)` |
| `year` | int | `2018` to `2025` |
| `include_advice` | bool | `true` / `false` |

**Response:**
```json
{
  "rank": 5000,
  "category": "OPEN",
  "gender": "Gender-Neutral",
  "year": 2024,
  "total_results": 20,
  "data": [
    {
      "institute": "NIT Trichy",
      "branch": "Computer Science and Engineering",
      "opening_rank": 4200,
      "closing_rank": 5800,
      "chance": "High"
    }
  ],
  "ai_advice": "Based on your rank..."
}
```

---

### AI Chatbot
```
POST /chat/
```
```json
{
  "message": "Which branch has the best placements at NIT?",
  "history": []
}
```

---

## ⚙️ Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `GEMINI_API_KEY` | Google Gemini API key |

> ⚠️ Never commit your `.env` file. It is listed in `.gitignore`.

---

## 🧠 How Admission Chance is Calculated

| Chance | Condition |
|---|---|
| 🟢 High | Closing rank is 3000+ above your rank |
| 🟡 Medium | Closing rank is 1000–3000 above your rank |
| 🔴 Low | Closing rank is within 1000 of your rank |

---

## 🗺️ Pages

| Page | Description |
|---|---|
| **Home** | Landing page with features and how-it-works |
| **Predictor** | Form to enter rank and get college predictions |
| **Results** | Filtered table with stats and optional AI advice |
| **AI Advisor** | Chat interface for JEE career counseling |

---

## 📦 Requirements

```
fastapi
uvicorn
sqlalchemy
psycopg2-binary
python-dotenv
pandas
google-genai
```

---

## 🙋 Author

**Ankur**
- GitHub: [@ankur-15](https://github.com/ankur-15)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
