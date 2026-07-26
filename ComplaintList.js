import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ComplaintList() {
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // ✅ role (only once)
  const role = localStorage.getItem("role");

  // ✅ fetch data
  useEffect(() => {
    fetch(`http://localhost/complaint-backend/getComplaints.php?search=${searchId}&status=${statusFilter}&role=${role}`)
      .then((res) => res.json())
      .then((data) => {
        setComplaints(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [searchId, statusFilter, role]);

  const isValidTicket =
    searchId.startsWith("TKT") && searchId.length >= 6;

  return (
    <div className="container">

      {/* 🔝 HEADER */}
      <div className="top-bar">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back
        </button>

        <h2 className="complaints-title">Your Complaints</h2>
      </div>

      {/* 🔍 SEARCH + FILTER */}
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
        </select>
      </div>

      {/* 📋 LIST */}
      {role === "admin" ? (
        // ✅ ADMIN → show all complaints
        complaints.length === 0 ? (
          <p style={{ color: "#F5F0E9" }}>No complaints found</p>
        ) : (
          complaints.map((c) => (
            <div className="card" key={c.id}>
              <h3>{c.title || "No Title"}</h3>
              <p>{c.description || "No Description"}</p>
              <p><strong>Category:</strong> {c.category}</p>
              <p><strong>Priority:</strong> {c.priority}</p>
              <p><strong>Ticket ID:</strong> {c.ticket_id}</p>
              <p><strong>Status:</strong> {c.status}</p>
            </div>
          ))
        )
      ) : (
        // ✅ STUDENT → require valid ticket
        !isValidTicket ? (
          <p style={{ color: "#F5F0E9" }}>
            Enter your full Ticket ID to view complaint
          </p>
        ) : complaints.length === 0 ? (
          <p style={{ color: "#F5F0E9" }}>
            No complaints found
          </p>
        ) : (
          <div className="blur">
            {complaints.map((c) => (
              <div className="card" key={c.id}>
                <h3>{c.title || "No Title"}</h3>
                <p>{c.description || "No Description"}</p>
                <p><strong>Category:</strong> {c.category}</p>
                <p><strong>Priority:</strong> {c.priority}</p>
                <p><strong>Ticket ID:</strong> {c.ticket_id}</p>
                <p><strong>Status:</strong> {c.status}</p>
              </div>
            ))}
          </div>
        )
      )}

    </div>
  );
}

export default ComplaintList;