import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "./Loader";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("loginShown");

    if (alreadyShown) {
      setShowLogin(true);
    } else {
      const t = setTimeout(() => {
        setShowLogin(true);
        sessionStorage.setItem("loginShown", "true");
      }, 1500);

      return () => clearTimeout(t);
    }
  }, []);

  const handleLogin = async () => {
    if (loading) return; // 🚫 prevent multiple clicks

    setLoading(true);

    try {
      const res = await fetch("http://localhost/complaint-backend/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // ✅ safer parsing (prevents crash if backend breaks)
      const text = await res.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid JSON from server");
      }

      if (data.message === "Login successful") {
        localStorage.setItem("role", data.role);
        localStorage.setItem("loginMessage", `Login successful as ${data.role}`);

        // ⏳ let loader play once, then go dashboard
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);

      } else {
        setLoading(false);
        alert(data.message || "Login failed");
      }

    } catch (error) {
      console.error("Login error:", error);

      setLoading(false); // ✅ prevents infinite loader
      alert("Server error. Check backend or console.");
    }
  };

  return (
    <>
      {loading && <Loader />}

      <div className="login-wrapper">
        
        <div className={`bg-gradient ${showLogin ? "blur" : ""}`}></div>

        <div className={`login-container ${showLogin ? "show" : ""}`}>
          <div className="login-card">
            <h2 className="login-title">Login</h2>
            <p className="login-subtitle">
              Enter your email and password
            </p>

            <input
              className="login-input"
              type="email"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="login-input"
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="login-btn"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Please wait..." : "Login"}
            </button>
          </div>
        </div>

      </div>
    </>
  );
}

export default Login;