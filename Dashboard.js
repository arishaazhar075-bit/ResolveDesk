import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0
  });

  // ✅ NEW: login toast state
  const [toast, setToast] = useState("");

  // ✅ EXISTING: stats fetch
  useEffect(() => {
    fetch("http://localhost/complaint-backend/getStats.php")
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  // ✅ NEW: show login message from localStorage
  useEffect(() => {
    const msg = localStorage.getItem("loginMessage");

    if (msg) {
      setToast(msg);

      setTimeout(() => {
        setToast("");
        localStorage.removeItem("loginMessage");
      }, 2000); // 2 sec
    }
  }, []);

  return (
    <div className="container">

      {/* ✅ NEW: Top Center Toast */}
      {toast && <div className="toast-center">{toast}</div>}

      <h1 className="dashboard-title">Dashboard </h1>

      {/* ✅ Paragraph OUTSIDE card */}
      <p className="dashboard-text">
        Welcome! You can submit new complaints or view your previous ones here.
      </p>

      {/* ✅ Card only for main actions */}
      <div className="card">
        <button onClick={() => navigate("/submit")}>
          Submit Complaint
        </button>

        <button onClick={() => navigate("/complaints")}>
          View Complaints
        </button>

        <button onClick={() => navigate("/admin")}>
          Admin Panel
        </button>
      </div>

      {/* 🔷 Stats */}
      <div className="stats-container">

        <div className="stat-box">
          <h4>Total</h4>
          <p>{stats.total}</p>
        </div>

        <div className="stat-box">
          <h4>Pending</h4>
          <p>{stats.pending}</p>
        </div>

        <div className="stat-box">
          <h4>Resolved</h4>
          <p>{stats.resolved}</p>
        </div>

      </div>

      {/* ✅ Go Back */}
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Go Back
      </button>

    </div>
  );
}

export default Dashboard;