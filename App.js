import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import SubmitComplaint from "./components/SubmitComplaint";
import ComplaintList from "./components/ComplaintList";
import AdminPanel from "./components/AdminPanel";
import bg from "./components/assets/bg-pattern.jpg";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ❌ Login بدون background */}
        <Route path="/" element={<Login />} />

        {/* ✅ All other pages with background */}
        {/* ✅ Replace below routes */}
        <Route
          path="/dashboard"
          element={
            <div className="app-bg" style={{ backgroundImage: `url(${bg})` }}>
              <Dashboard />
            </div>
          }
        />

        <Route
          path="/submit"
          element={
            <div className="app-bg" style={{ backgroundImage: `url(${bg})` }}>
              <SubmitComplaint />
            </div>
          }
        />

        <Route
          path="/complaints"
          element={
            <div className="app-bg" style={{ backgroundImage: `url(${bg})` }}>
              <ComplaintList />
            </div>
          }
        />

        <Route
          path="/admin"
          element={
            <div className="app-bg" style={{ backgroundImage: `url(${bg})` }}>
              <AdminPanel />
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;