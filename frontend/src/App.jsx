import { useState, useRef, useEffect } from "react";

const API_BASE = "http://127.0.0.1:8000";

// ─── Design Tokens ───────────────────────────────────────────
const styles = {
  vars: `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Outfit:wght@300;400;500;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --white: #ffffff;
      --bg: #f7f8fc;
      --bg2: #eef0f7;
      --surface: #ffffff;
      --border: #e2e5f0;
      --text: #1a1d2e;
      --text-muted: #6b7385;
      --primary: #2c5ee8;
      --primary-light: #eef2fd;
      --primary-hover: #1e4dd4;
      --accent: #f4a624;
      --high: #16a34a;
      --high-bg: #f0fdf4;
      --medium: #d97706;
      --medium-bg: #fffbeb;
      --low: #dc2626;
      --low-bg: #fef2f2;
      --radius: 12px;
      --radius-lg: 20px;
      --shadow-sm: 0 1px 4px rgba(0,0,0,0.06);
      --shadow: 0 4px 20px rgba(0,0,0,0.08);
      --shadow-lg: 0 12px 40px rgba(0,0,0,0.12);
      --font-display: 'Playfair Display', serif;
      --font-body: 'Outfit', sans-serif;
    }
    body { font-family: var(--font-body); background: var(--bg); color: var(--text); }
    input, select, button, textarea { font-family: var(--font-body); }
  `
};

// ─── Global CSS ───────────────────────────────────────────────
const GlobalStyle = () => (
  <style>{`
    ${styles.vars}
    .page { min-height: 100vh; display: flex; flex-direction: column; }

    /* Nav */
    nav {
      background: var(--white);
      border-bottom: 1px solid var(--border);
      padding: 0 48px;
      height: 64px;
      display: flex; align-items: center; justify-content: space-between;
      position: sticky; top: 0; z-index: 100;
      box-shadow: var(--shadow-sm);
    }
    .nav-logo {
      font-family: var(--font-display);
      font-size: 1.3rem;
      font-weight: 700;
      color: var(--primary);
      cursor: pointer;
    }
    .nav-links { display: flex; gap: 8px; }
    .nav-link {
      background: none; border: none; cursor: pointer;
      padding: 8px 16px; border-radius: 8px;
      font-size: 0.9rem; font-weight: 500; color: var(--text-muted);
      transition: all 0.15s;
    }
    .nav-link:hover { background: var(--bg); color: var(--text); }
    .nav-link.active { background: var(--primary-light); color: var(--primary); font-weight: 600; }
    .nav-cta {
      background: var(--primary); color: white; border: none;
      padding: 9px 20px; border-radius: 8px; font-size: 0.88rem;
      font-weight: 600; cursor: pointer; transition: background 0.15s;
    }
    .nav-cta:hover { background: var(--primary-hover); }

    /* Buttons */
    .btn {
      border: none; border-radius: var(--radius); cursor: pointer;
      font-weight: 600; font-size: 0.95rem; transition: all 0.15s;
      display: inline-flex; align-items: center; gap: 8px;
    }
    .btn-primary {
      background: var(--primary); color: white;
      padding: 13px 28px;
    }
    .btn-primary:hover { background: var(--primary-hover); transform: translateY(-1px); box-shadow: 0 4px 16px rgba(44,94,232,0.3); }
    .btn-primary:disabled { background: #a0aec0; cursor: not-allowed; transform: none; box-shadow: none; }
    .btn-outline {
      background: white; color: var(--primary);
      border: 1.5px solid var(--primary);
      padding: 12px 28px;
    }
    .btn-outline:hover { background: var(--primary-light); }
    .btn-lg { padding: 16px 36px; font-size: 1rem; border-radius: 14px; }
    .btn-sm { padding: 8px 16px; font-size: 0.85rem; }

    /* Form elements */
    .field { display: flex; flex-direction: column; gap: 6px; }
    .field label {
      font-size: 0.8rem; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.8px; color: var(--text-muted);
    }
    .field input, .field select {
      background: var(--white); border: 1.5px solid var(--border);
      border-radius: var(--radius); padding: 12px 14px;
      font-size: 0.95rem; color: var(--text); outline: none;
      transition: border-color 0.15s, box-shadow 0.15s;
      appearance: none;
    }
    .field input:focus, .field select:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(44,94,232,0.1);
    }
    .field input::placeholder { color: #c0c5d5; }

    /* Card */
    .card {
      background: var(--white); border: 1px solid var(--border);
      border-radius: var(--radius-lg); padding: 32px;
      box-shadow: var(--shadow);
    }

    /* Badge */
    .badge {
      display: inline-flex; align-items: center;
      padding: 4px 12px; border-radius: 999px;
      font-size: 0.75rem; font-weight: 700; letter-spacing: 0.3px;
    }
    .badge-high { background: var(--high-bg); color: var(--high); }
    .badge-medium { background: var(--medium-bg); color: var(--medium); }
    .badge-low { background: var(--low-bg); color: var(--low); }
    .badge-primary { background: var(--primary-light); color: var(--primary); }

    /* Alert */
    .alert {
      padding: 14px 18px; border-radius: var(--radius);
      font-size: 0.9rem; margin-top: 12px;
    }
    .alert-error { background: var(--low-bg); color: var(--low); border: 1px solid #fecaca; }
    .alert-info { background: var(--primary-light); color: var(--primary); border: 1px solid #bfdbfe; }

    /* Spinner */
    .spinner {
      width: 22px; height: 22px;
      border: 2.5px solid rgba(255,255,255,0.3);
      border-top-color: white; border-radius: 50%;
      animation: spin 0.7s linear infinite; display: inline-block;
    }
    .spinner-primary {
      border-color: rgba(44,94,232,0.2); border-top-color: var(--primary);
    }

    /* Animations */
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .animate-fadeup { animation: fadeUp 0.5s ease both; }
    .animate-fadein { animation: fadeIn 0.4s ease both; }

    /* Section */
    .section { padding: 72px 48px; max-width: 1100px; margin: 0 auto; width: 100%; }
    .section-sm { padding: 48px 48px; max-width: 1100px; margin: 0 auto; width: 100%; }

    /* Divider */
    .divider { height: 1px; background: var(--border); margin: 32px 0; }

    /* Table */
    .table-wrap { overflow-x: auto; border-radius: var(--radius-lg); border: 1px solid var(--border); }
    table { width: 100%; border-collapse: collapse; background: white; }
    thead tr { background: var(--bg); border-bottom: 2px solid var(--border); }
    th { padding: 13px 16px; text-align: left; font-size: 0.75rem; font-weight: 700;
         text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); white-space: nowrap; }
    td { padding: 14px 16px; font-size: 0.9rem; border-bottom: 1px solid var(--border); }
    tbody tr:last-child td { border-bottom: none; }
    tbody tr:hover { background: var(--bg); }
    .td-institute { font-weight: 600; color: var(--text); max-width: 280px; }
    .td-muted { color: var(--text-muted); font-size: 0.82rem; }

    @media (max-width: 768px) {
      nav { padding: 0 20px; }
      .nav-links { display: none; }
      .section, .section-sm { padding: 40px 20px; }
    }
  `}</style>
);

// ─── Navbar ───────────────────────────────────────────────────
function Navbar({ page, setPage }) {
  const links = [
    { id: "home", label: "Home" },
    { id: "predictor", label: "Predictor" },
    { id: "chatbot", label: "AI Advisor" },
  ];
  return (
    <nav>
      <div className="nav-logo" onClick={() => setPage("home")}>🎓 CarryurCareer</div>
      <div className="nav-links">
        {links.map(l => (
          <button key={l.id} className={`nav-link${page === l.id ? " active" : ""}`} onClick={() => setPage(l.id)}>
            {l.label}
          </button>
        ))}
      </div>
      <button className="nav-cta btn" onClick={() => setPage("predictor")}>Get Prediction →</button>
    </nav>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────
function HomePage({ setPage }) {
  const features = [
    { icon: "📊", title: "2018–2025 Cutoff Data", desc: "Accurate JEE Mains cutoff data across all rounds, institutes, and categories." },
    { icon: "🤖", title: "Gemini AI Advice", desc: "Get personalised career guidance powered by Google's Gemini AI model." },
    { icon: "⚡", title: "Instant Results", desc: "See your college options ranked by admission probability in seconds." },
    { icon: "💬", title: "AI Chat Counselor", desc: "Ask any JEE-related question to an intelligent career counselor, 24/7." },
  ];

  const steps = [
    { num: "01", title: "Enter Your Rank", desc: "Input your JEE rank, category, gender and the cutoff year." },
    { num: "02", title: "Get Predictions", desc: "We match your rank against thousands of real cutoff records." },
    { num: "03", title: "Get AI Advice", desc: "Gemini AI analyses your results and recommends the best path forward." },
  ];

  return (
    <div className="page">
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #fdf8f0 100%)", borderBottom: "1px solid var(--border)" }}>
        <div className="section animate-fadeup" style={{ textAlign: "center", paddingTop: 96, paddingBottom: 96 }}>
          <div className="badge badge-primary" style={{ marginBottom: 24, fontSize: "0.8rem", padding: "6px 16px" }}>
            JEE College Predictor 2025
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 5vw, 3.6rem)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.5px", marginBottom: 24, color: "var(--text)" }}>
            Your JEE Rank. Your<br />
            <span style={{ color: "var(--primary)" }}>Perfect College Match.</span>
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.75 }}>
            Data-driven JEE college predictions backed by 7 years of real cutoff data, enhanced with Gemini AI career guidance.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn btn-primary btn-lg" onClick={() => setPage("predictor")}>
              Predict My Colleges →
            </button>
            <button className="btn btn-outline btn-lg" onClick={() => setPage("chatbot")}>
              Talk to AI Advisor
            </button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="section">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, marginBottom: 12 }}>Everything You Need</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem" }}>One platform for smarter JEE college decisions.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          {features.map((f, i) => (
            <div key={i} className="card animate-fadeup" style={{ animationDelay: `${i * 80}ms` }}>
              <div style={{ fontSize: "2rem", marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: 8 }}>{f.title}</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="section">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, marginBottom: 12 }}>How It Works</h2>
            <p style={{ color: "var(--text-muted)" }}>Three simple steps to find your ideal college.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 32 }}>
            {steps.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                <div style={{ background: "var(--primary)", color: "white", borderRadius: 12, width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9rem", flexShrink: 0 }}>
                  {s.num}
                </div>
                <div>
                  <h3 style={{ fontWeight: 700, marginBottom: 6 }}>{s.title}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.65 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="section" style={{ textAlign: "center" }}>
        <div className="card" style={{ background: "linear-gradient(135deg, var(--primary) 0%, #1e3fa8 100%)", border: "none", padding: "56px 40px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "white", marginBottom: 12 }}>
            Ready to find your college?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", marginBottom: 32, fontSize: "1rem" }}>
            Enter your rank and get results in under 5 seconds.
          </p>
          <button className="btn" style={{ background: "white", color: "var(--primary)", padding: "14px 36px", fontSize: "1rem", fontWeight: 700, borderRadius: 12 }} onClick={() => setPage("predictor")}>
            Start Predicting →
          </button>
        </div>
      </div>

      <footer style={{ borderTop: "1px solid var(--border)", padding: "24px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", color: "var(--text-muted)", fontSize: "0.85rem" }}>
        <span>🎓 CarryurCareer — JEE Intelligence Engine</span>
        <span>Powered by Gemini AI • 2018–2025 Data</span>
      </footer>
    </div>
  );
}

// ─── PREDICTOR PAGE ───────────────────────────────────────────
function PredictorPage({ setPage, setSharedResults }) {
  const [form, setForm] = useState({ rank: "", category: "OPEN", gender: "Gender-Neutral", year: "2024" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (withAdvice) => {
    if (!form.rank || parseInt(form.rank) <= 0) { setError("Please enter a valid JEE rank."); return; }
    setError(""); setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/predict/?rank=${form.rank}&category=${encodeURIComponent(form.category)}&gender=${encodeURIComponent(form.gender)}&year=${form.year}&include_advice=${withAdvice}`);
      if (!res.ok) { const e = await res.json(); setError(e.detail || "Server error."); setLoading(false); return; }
      const data = await res.json();
      setSharedResults({ ...data, form });
      setPage("results");
    } catch (e) {
      setError("Cannot connect to backend. Make sure the server is running on port 8000.");
    }
    setLoading(false);
  };

  return (
    <div className="page">
      <div className="section animate-fadeup" style={{ maxWidth: 700 }}>

        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <div className="badge badge-primary" style={{ marginBottom: 16 }}>College Predictor</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 700, marginBottom: 10 }}>
            Find Your College Match
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.7 }}>
            Enter your JEE details below. We'll match them against real cutoff data from 2018–2025.
          </p>
        </div>

        {/* Form */}
        <div className="card">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
            <div className="field" style={{ gridColumn: "1 / -1" }}>
              <label>JEE Rank *</label>
              <input type="number" placeholder="e.g. 5000" value={form.rank} min="1" onChange={e => update("rank", e.target.value)} />
            </div>
            <div className="field">
              <label>Category</label>
              <select value={form.category} onChange={e => update("category", e.target.value)}>
                <option value="OPEN">OPEN (General)</option>
                <option value="OBC-NCL">OBC-NCL</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="EWS">EWS</option>
                <option value="OPEN (PwD)">OPEN (PwD)</option>
                <option value="OBC-NCL (PwD)">OBC-NCL (PwD)</option>
              </select>
            </div>
            <div className="field">
              <label>Gender</label>
              <select value={form.gender} onChange={e => update("gender", e.target.value)}>
                <option value="Gender-Neutral">Gender-Neutral</option>
                <option value="Female-only (including Supernumerary)">Female-only</option>
              </select>
            </div>
            <div className="field" style={{ gridColumn: "1 / -1" }}>
              <label>Cutoff Year</label>
              <select value={form.year} onChange={e => update("year", e.target.value)}>
                {[2024,2023,2022,2021,2020,2019,2018].map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => submit(false)} disabled={loading}>
              {loading ? <><span className="spinner" />  Searching...</> : "Predict Colleges →"}
            </button>
            <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => submit(true)} disabled={loading}>
              {loading ? "Loading..." : "✦ Predict + AI Advice"}
            </button>
          </div>

          <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.8rem", marginTop: 16 }}>
            "Predict + AI Advice" calls Gemini AI — requires a valid API key with available quota.
          </p>
        </div>

        {/* Info cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginTop: 32 }}>
          {[
            { label: "High Chance", desc: "Closing rank 3000+ above yours", color: "var(--high)", bg: "var(--high-bg)" },
            { label: "Medium Chance", desc: "Closing rank 1000–3000 above yours", color: "var(--medium)", bg: "var(--medium-bg)" },
            { label: "Low Chance", desc: "Closing rank within 1000 of yours", color: "var(--low)", bg: "var(--low-bg)" },
          ].map((c, i) => (
            <div key={i} style={{ background: c.bg, border: `1px solid ${c.color}30`, borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontWeight: 700, fontSize: "0.85rem", color: c.color, marginBottom: 4 }}>{c.label}</div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.5 }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── RESULTS PAGE ─────────────────────────────────────────────
function ResultsPage({ results, setPage }) {
  const [filter, setFilter] = useState("All");

  if (!results) {
    return (
      <div className="page">
        <div className="section" style={{ textAlign: "center" }}>
          <p style={{ color: "var(--text-muted)", marginBottom: 20 }}>No results yet. Please run a prediction first.</p>
          <button className="btn btn-primary" onClick={() => setPage("predictor")}>Go to Predictor →</button>
        </div>
      </div>
    );
  }

  const { data, total_results, rank, category, gender, year, ai_advice } = results;
  const filtered = filter === "All" ? data : data.filter(r => r.chance === filter);

  const counts = {
    All: data.length,
    High: data.filter(r => r.chance === "High").length,
    Medium: data.filter(r => r.chance === "Medium").length,
    Low: data.filter(r => r.chance === "Low").length,
  };

  return (
    <div className="page animate-fadein">
      <div className="section-sm">

        {/* Header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 28 }}>
          <div>
            <button onClick={() => setPage("predictor")} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "0.88rem", marginBottom: 8, display: "flex", alignItems: "center", gap: 4 }}>
              ← Back to Predictor
            </button>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 700 }}>Prediction Results</h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginTop: 4 }}>
              Rank <strong>{rank}</strong> · {category} · {gender === "Gender-Neutral" ? "Gender-Neutral" : "Female-only"} · {year}
            </p>
          </div>
          <button className="btn btn-outline btn-sm" onClick={() => setPage("chatbot")}>💬 Ask AI Advisor</button>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
          {[
            { label: "Total Found", val: total_results, color: "var(--primary)" },
            { label: "High Chance", val: counts.High, color: "var(--high)" },
            { label: "Medium Chance", val: counts.Medium, color: "var(--medium)" },
            { label: "Low Chance", val: counts.Low, color: "var(--low)" },
          ].map((s, i) => (
            <div key={i} className="card" style={{ padding: "20px 24px", textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: s.color }}>{s.val}</div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* AI Advice */}
        {ai_advice && (
          <div className="card" style={{ background: "linear-gradient(135deg, #f0f7ff, #fffdf0)", border: "1px solid #bfdbfe", marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span style={{ fontSize: "1.3rem" }}>✦</span>
              <span style={{ fontWeight: 700, color: "var(--primary)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.8px" }}>Gemini AI Career Advice</span>
            </div>
            <p style={{ color: "var(--text)", lineHeight: 1.85, whiteSpace: "pre-wrap", fontSize: "0.95rem" }}>{ai_advice}</p>
          </div>
        )}

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {["All", "High", "Medium", "Low"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{
                padding: "7px 18px", borderRadius: 999, border: "1.5px solid",
                cursor: "pointer", fontSize: "0.85rem", fontWeight: 600, transition: "all 0.15s",
                borderColor: filter === f ? "var(--primary)" : "var(--border)",
                background: filter === f ? "var(--primary)" : "white",
                color: filter === f ? "white" : "var(--text-muted)"
              }}>
              {f} ({counts[f] ?? filtered.length})
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Institute</th>
                <th>Branch</th>
                <th>Opening Rank</th>
                <th>Closing Rank</th>
                <th>Chance</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={i}>
                  <td className="td-muted">{i + 1}</td>
                  <td className="td-institute">{r.institute}</td>
                  <td style={{ fontSize: "0.9rem", color: "var(--text)" }}>{r.branch}</td>
                  <td className="td-muted">{r.opening_rank ?? "—"}</td>
                  <td style={{ fontWeight: 600 }}>{r.closing_rank}</td>
                  <td>
                    <span className={`badge badge-${r.chance.toLowerCase()}`}>{r.chance}</span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} style={{ textAlign: "center", color: "var(--text-muted)", padding: 40 }}>No results for this filter.</td></tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

// ─── CHATBOT PAGE ─────────────────────────────────────────────
function ChatbotPage() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! I'm your JEE career counselor powered by Gemini AI. Ask me anything about colleges, branches, placements, or career paths. 👋" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async () => {
    const msg = input.trim();
    if (!msg || loading) return;
    setInput("");

    const newMessages = [...messages, { role: "user", text: msg }];
    setMessages(newMessages);
    setLoading(true);

    const history = newMessages.slice(0, -1).map(m => ({ role: m.role === "user" ? "user" : "assistant", content: m.text }));

    try {
      const res = await fetch(`${API_BASE}/chat/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, history })
      });
      const data = await res.json();
      setMessages(m => [...m, { role: "assistant", text: data.reply || "Sorry, I couldn't process that." }]);
    } catch {
      setMessages(m => [...m, { role: "assistant", text: "⚠ Cannot connect to the server. Please ensure the backend is running." }]);
    }
    setLoading(false);
  };

  const suggestions = [
    "Which IIT branch has best placements?",
    "I have rank 10000 in OBC, what are my options?",
    "Compare CSE at NIT vs IIT for placements",
    "What should I choose — CSE or ECE?",
  ];

  return (
    <div className="page">
      <div style={{ maxWidth: 760, margin: "0 auto", width: "100%", padding: "40px 20px", flex: 1, display: "flex", flexDirection: "column" }}>

        {/* Header */}
        <div style={{ marginBottom: 24, animationName: "fadeUp", animationDuration: "0.5s" }}>
          <div className="badge badge-primary" style={{ marginBottom: 12 }}>AI Career Advisor</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, marginBottom: 8 }}>Ask Anything</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>Get personalised JEE career guidance from Gemini AI.</p>
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
            {suggestions.map((s, i) => (
              <button key={i} onClick={() => { setInput(s); }}
                style={{ background: "white", border: "1.5px solid var(--border)", borderRadius: 999, padding: "7px 14px", fontSize: "0.82rem", color: "var(--text-muted)", cursor: "pointer", transition: "all 0.15s", fontFamily: "var(--font-body)", fontWeight: 500 }}
                onMouseEnter={e => { e.target.style.borderColor = "var(--primary)"; e.target.style.color = "var(--primary)"; }}
                onMouseLeave={e => { e.target.style.borderColor = "var(--border)"; e.target.style.color = "var(--text-muted)"; }}>
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Chat window */}
        <div className="card" style={{ flex: 1, display: "flex", flexDirection: "column", padding: 0, overflow: "hidden", minHeight: 420 }}>
          <div style={{ flex: 1, overflowY: "auto", padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                {m.role === "assistant" && (
                  <div style={{ width: 32, height: 32, background: "var(--primary-light)", borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", marginRight: 10, flexShrink: 0, marginTop: 4 }}>✦</div>
                )}
                <div style={{
                  maxWidth: "75%", padding: "12px 16px", borderRadius: 14,
                  fontSize: "0.92rem", lineHeight: 1.7, whiteSpace: "pre-wrap",
                  background: m.role === "user" ? "var(--primary)" : "var(--bg)",
                  color: m.role === "user" ? "white" : "var(--text)",
                  borderBottomRightRadius: m.role === "user" ? 4 : 14,
                  borderBottomLeftRadius: m.role === "assistant" ? 4 : 14,
                  boxShadow: "var(--shadow-sm)",
                  animation: "fadeIn 0.3s ease both"
                }}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, background: "var(--primary-light)", borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem" }}>✦</div>
                <div style={{ background: "var(--bg)", padding: "12px 18px", borderRadius: 14, borderBottomLeftRadius: 4 }}>
                  <span className="spinner spinner-primary" style={{ width: 18, height: 18, borderWidth: 2 }} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", padding: "12px 16px", gap: 12 }}>
            <input
              value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Ask about colleges, branches, placements..."
              style={{ flex: 1, border: "1.5px solid var(--border)", borderRadius: 10, padding: "11px 16px", fontSize: "0.92rem", outline: "none", color: "var(--text)", background: "var(--bg)", fontFamily: "var(--font-body)" }}
              onFocus={e => e.target.style.borderColor = "var(--primary)"}
              onBlur={e => e.target.style.borderColor = "var(--border)"}
            />
            <button className="btn btn-primary btn-sm" onClick={send} disabled={loading || !input.trim()}>
              {loading ? <span className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} /> : "Send →"}
            </button>
          </div>
        </div>

        <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.78rem", marginTop: 12 }}>
          AI responses require a valid Gemini API key with available quota.
        </p>
      </div>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [sharedResults, setSharedResults] = useState(null);

  const renderPage = () => {
    switch (page) {
      case "home":      return <HomePage setPage={setPage} />;
      case "predictor": return <PredictorPage setPage={setPage} setSharedResults={setSharedResults} />;
      case "results":   return <ResultsPage results={sharedResults} setPage={setPage} />;
      case "chatbot":   return <ChatbotPage />;
      default:          return <HomePage setPage={setPage} />;
    }
  };

  return (
    <>
      <GlobalStyle />
      <Navbar page={page} setPage={setPage} />
      {renderPage()}
    </>
  );
}
