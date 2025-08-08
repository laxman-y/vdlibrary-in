import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
     <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
  <img src="/logo11.png" alt="VDL Logo" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
  <h1 style={{ margin: 0 }}>Vinayak Digital Library</h1>
</div>
      <div className="nav-links">
        <Link to="/">🏠 Dashboard</Link>
        {currentUser && (
          <>
            <button onClick={handleLogout}>🚪 Logout</button>
          </>
        )}
        {currentUser && (
  <>
    <Link to="/admin-settings">⚙️ Admin Settings</Link>
  </>
)}
      </div>
    </nav>
  );
}

export default Navbar;
