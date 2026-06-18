import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

export default function AdminLogin() {
  const [email, setEmail] = useState("admin@jd2meditech.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function login(event) {
    event.preventDefault();
    try {
      const res = await api.post("/admin/login", { email, password });
      localStorage.setItem("jd2_admin_token", res.data.token);
      navigate("/admin/dashboard");
    } catch {
      setError("Invalid admin login. Run the server seed first.");
    }
  }

  return (
    <main className="admin-login">
      <form className="panel-form" onSubmit={login}>
        <img src="/images/logo.png" alt="JD2 Meditech" />
        <h1>Admin Module</h1>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Admin email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button className="button primary" type="submit">Login</button>
        {error && <small>{error}</small>}
      </form>
    </main>
  );
}
