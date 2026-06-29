import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

const demoEmail = "admin@jd2meditech.com";
const demoPassword = "admin123";
const demoToken = "jd2-demo-admin-token";

export default function AdminLogin() {
  const [email, setEmail] = useState(demoEmail);
  const [password, setPassword] = useState(demoPassword);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function canUseDemoLogin(status, hasResponse) {
    return email === demoEmail && password === demoPassword && (status === 404 || !hasResponse);
  }

  function enterDemoMode() {
    localStorage.setItem("jd2_admin_token", demoToken);
    localStorage.setItem("jd2_admin_demo", "true");
    navigate("/admin/dashboard");
  }

  async function login(event) {
    event.preventDefault();
    try {
      const res = await api.post("/admin/login", { email, password });
      localStorage.setItem("jd2_admin_token", res.data.token);
      localStorage.removeItem("jd2_admin_demo");
      navigate("/admin/dashboard");
    } catch (error) {
      const status = error.response?.status;
      if (canUseDemoLogin(status, Boolean(error.response))) {
        enterDemoMode();
      } else if (status === 401) {
        setError("Invalid admin email or password.");
      } else if (status === 404) {
        setError("Admin API not found. Use the demo credentials or check the server deployment.");
      } else if (!error.response) {
        setError("Admin API is not reachable. Use the demo credentials or check server URL/CORS.");
      } else {
        setError(`Admin login failed with server status ${status}.`);
      }
    }
  }

  return (
    <main className="admin-login">
      <form className="panel-form" onSubmit={login}>
        <div className="login-logo-wrap">
          <img src="/images/logo.png" alt="JD2 Meditech" onError={(e) => { e.target.style.display = "none"; e.target.parentElement.querySelector(".logo-fallback").style.display = "flex"; }} />
          <span className="logo-fallback" style={{display:"none", fontSize:"28px", fontWeight:900, color:"var(--ink)", letterSpacing:"-1px"}}>JD2</span>
        </div>
        <h1>Admin Module</h1>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Admin email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button className="button primary" type="submit">Login</button>
        {error && <small>{error}</small>}
      </form>
    </main>
  );
}
