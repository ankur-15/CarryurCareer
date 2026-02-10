# CarryurCareer 🎓

CarryurCareer is a **college prediction web application** that helps students
estimate their chances of getting specific colleges and branches based on
their **entrance exam rank and category**.

It combines a **FastAPI backend** with a **simple web-based frontend**
to provide instant, data-driven predictions.

> ⚠️ **Note:** This project is currently under active development and will be continuously improved with better data, UI, and features.

---

## 🚀 Features

### 🔧 Backend (FastAPI)
- Rank-based college prediction
- Category-wise filtering (GEN, OBC, SC, ST, etc.)
- CSV-driven cutoff data
- RESTful API with JSON response
- Fast and lightweight FastAPI framework

### 🎨 Frontend (HTML/CSS/JavaScript)
- Simple and clean UI
- Input fields for rank and category
- Fetches real-time predictions from backend API
- Displays results dynamically without page reload

---

## 🛠️ Tech Stack

| Layer     | Technology |
|----------|------------|
| Backend  | FastAPI, Python |
| Frontend| HTML, CSS, JavaScript |
| Data    | CSV |
| Server  | Uvicorn |
| Version Control | Git & GitHub |

---

## 📂 Project Structure

CarryurCareer/
│
├── backend/
│ ├── main.py # FastAPI app
│ ├── predictor.py # College prediction logic
│ └── data/
│ └── colleges.csv
│
├── frontend/
│ ├── index.html
│ ├── script.js
│ └── style.css
│
├── requirements.txt
└── README.md
