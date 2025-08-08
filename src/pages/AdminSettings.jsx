import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function AdminSettings() {
  const { changeCredentials, resetPassword, adminUsername } = useAuth();
  const [newUsername, setNewUsername] = useState(adminUsername);
  const [newPassword, setNewPassword] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    if (newUsername && newPassword) {
      changeCredentials(newUsername, newPassword);
      alert("✅ Admin credentials updated!");
    }
  };

  const handleReset = () => {
    resetPassword();
    alert("🔁 Password reset to default: admin123");
  };

  return (
    <div className="dashboard-container">
      <h2>⚙️ Admin Settings</h2>
      <form onSubmit={handleChange}>
        <label>New Username:</label><br />
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          required
        /><br />

        <label>New Password:</label><br />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        /><br />

        <button type="submit">Change Credentials</button>
      </form>
      <br />
      <button onClick={handleReset}>🔁 Reset Password to Default</button>
    </div>
  );
}

export default AdminSettings;
