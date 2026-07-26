import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SubmitComplaint() {
  const navigate = useNavigate();

  const [department, setDepartment] = useState("");
  const [studentId, setStudentId] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false); // ✅ new
  const [toast, setToast] = useState("");
  const handleSubmit = async () => {

    if (submitting) return; // 🚫 prevent double click

    // ✅ validation
    if (!category || !priority || !title || !description) {
      alert("Please fill all required fields");
      return;
    }

    setSubmitting(true); // 🔒 lock button

    try {
      const res = await fetch("http://localhost/complaint-backend/submitComplaint.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: 1,
          department,
          student_id: studentId,
          category,
          priority,
          title,
          description,
        }),
      });

       const data = await res.json();   // ✅ important

  // ✅ show ticket
  setToast(`Your Ticket ID: ${data.ticket_id}`);

      // ✅ clear form after submit
      setDepartment("");
      setStudentId("");
      setCategory("");
      setPriority("");
      setTitle("");
      setDescription("");

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }

    setSubmitting(false); // 🔓 unlock
  };

  return (
  <div className="container">
    {toast && (
  <div className="toast">
    <span>{toast}</span>
    <button className="toast-btn" onClick={() => setToast("")}>
      OK
    </button>
  </div>
)}
      <div className="card">
        <h3>Submit Complaint</h3>

        {/* ✅ Category + Priority */}
        {/* Category + Priority */}
<div style={{ display: "flex", gap: "10px" }}>

  <select
    style={{ flex: 1 }}
    value={category}
    onChange={(e) => setCategory(e.target.value)}
  >
    <option value="">Select Category</option>
    <option>Hardware Issue</option>
    <option>Software Issue</option>
    <option>Network Problem</option>
    <option>Lab Issue</option>
    <option>Lost Document</option>
    <option>Cafeteria Issue</option>
    <option>Staff Issue</option>
    <option>Course Related</option>
  </select>

  <select
    style={{ flex: 1 }}
    value={priority}
    onChange={(e) => setPriority(e.target.value)}
  >
    <option value="">Select Priority</option>
    <option>High</option>
    <option>Medium</option>
    <option>Low</option>
  </select>

</div>

        {/* Inputs */}
        <input
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        <input
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Submit */}
        <button onClick={handleSubmit} disabled={submitting}>
          {submitting ? "Submitting..." : "Submit"}
        </button>

        {/* Back */}
        <button onClick={() => navigate("/dashboard")}>
          Go Back
        </button>
      </div>
    </div>
  );
}

export default SubmitComplaint;