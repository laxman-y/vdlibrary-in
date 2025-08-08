import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
const BASE_URL = import.meta.env.VITE_BASE_URL;

function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="container">
      <h2>🔐 Admin Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <br />
       &nbsp;  &nbsp;  &nbsp; <button type="submit">Login</button>
        <br />
        <p
  style={{
    cursor: 'pointer',
    marginTop: '20px',
    color: 'blue',
    textDecoration: 'underline'
  }}
  onClick={() => navigate('/forgot-password')}
>
  Forgot Password?
</p>

      </form>
    </div>
  );
}

export default Login;
