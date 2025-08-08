import React, { useState } from "react";
import '../style.css'; // 👈 make sure this path is correct
const BASE_URL = import.meta.env.VITE_BASE_URL;

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);

  const sendOTP = async () => {
    const res = await fetch(`${BASE_URL}/api/auth/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (res.ok) {
      setOtpSent(true);
      setMsg("✅ OTP sent to your email.");
      setIsError(false);
    } else {
      setMsg(data.error || "❌ Failed to send OTP.");
      setIsError(true);
    }
  };

  const resetPassword = async () => {
    const res = await fetch(`${BASE_URL}/api/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, newPassword }),
    });
    const data = await res.json();
    setMsg(data.message || data.error);
    setIsError(!res.ok);
  };

  return (
    <div className="forgot-container">
      <h2>🔁 Forgot Password</h2>

      {!otpSent ? (
        <>
          <input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={sendOTP}>Send OTP</button>
        </>
      ) : (
        <>
          <input
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <input
            placeholder="Enter New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={resetPassword}>Reset Password</button>
        </>
      )}

      {msg && (
        <p className={`forgot-message ${isError ? "error" : ""}`}>{msg}</p>
      )}
    </div>
  );
}

export default ForgotPassword;
