// components/DashboardButton.jsx
import { useNavigate } from "react-router-dom";

const DashboardButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        padding: "10px 16px",
        borderRadius: "8px",
        cursor: "pointer",
        zIndex: 1000,
      }}
    >
      🏠 Dashboard
    </button>
  );
};

export default DashboardButton;
