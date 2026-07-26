import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminPanel() {
  const [searchId, setSearchId] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();

  // 🔐 restrict non-admin
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/dashboard");
    }
  }, [navigate]);

  // 📡 fetch complaints (WITH ROLE)
  useEffect(() => {
    const role = localStorage.getItem("role");

    fetch(`http://localhost/complaint-backend/getComplaints.php?search=${searchId}&status=${statusFilter}&role=${role}`)
      .then(res => res.json())
      .then(data => setComplaints(data))
      .catch(err => console.error(err));
  }, [searchId, statusFilter]);

  // ✅ FIXED: updateStatus function
  const updateStatus = (id, status) => {
    fetch("http://localhost/complaint-backend/updateStatus.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `id=${id}&status=${status}`
    })
      .then(res => res.text())
      .then(msg => {
        alert(msg);
        window.location.reload();
      });
  };

  return (
    <div className="container">

      {/* 🔍 SEARCH */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by Ticket ID (TKT123)"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
          <option value="In Progress">In Progress</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <button
        className="back-btn"
        onClick={() => navigate("/dashboard")}
      >
        ← Go Back
      </button>

      <h2 className="complaints-title">Admin Panel</h2>

      {complaints.map((c) => (
        <div className="card" key={c.id}>
          <h3>{c.title}</h3>

          <p>{c.description}</p>

          <p><strong>Category:</strong> {c.category}</p>
          <p><strong>Ticket ID:</strong> {c.ticket_id}</p>
          <p><strong>Priority:</strong> {c.priority}</p>
          <p><strong>Status:</strong> {c.status}</p>

          {/* ✅ ADMIN ACTIONS */}
          <button onClick={() => updateStatus(c.id, "In Progress")}>
            In Progress
          </button>

          <button onClick={() => updateStatus(c.id, "Resolved")}>
            Resolved
          </button>

          <button onClick={() => updateStatus(c.id, "Rejected")}>
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminPanel;