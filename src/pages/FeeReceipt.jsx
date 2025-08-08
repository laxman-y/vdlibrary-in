import React, { useState } from "react";
import axios from "axios";
import "../style.css";
const BASE_URL = import.meta.env.VITE_BASE_URL;


export default function FeeReceipt() {
  const [month, setMonth] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const downloadReceipt = async () => {
    setErrorMsg("");

    if (!month || !password) {
      setErrorMsg("⚠ Please select a month and enter your mobile number");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/api/students/download-receipt`,
        { month, password },
        { responseType: "blob", validateStatus: () => true } // avoid auto-throw
      );

      if (res.status !== 200) {
        // If backend sent JSON instead of PDF, show the error
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const data = JSON.parse(reader.result);
            setErrorMsg(data.error || "❌ Failed to download receipt");
          } catch {
            setErrorMsg("❌ Failed to download receipt");
          }
        };
        reader.readAsText(res.data);
        return;
      }

      // Download the file
      const url = window.URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `receipt_${month}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setErrorMsg("❌ Server error while downloading receipt");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="receipt-wrapper">
      <div className="receipt-container">
        <h2 className="receipt-title">📄 Download Fee Receipt</h2>

        <div className="receipt-body">
          <div className="receipt-row">
            <strong>Select Month:</strong>
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
          </div>

          <div className="receipt-row">
            <strong>Password NO:</strong>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {errorMsg && <p className="error-message" style={{ color: "red" }}>{errorMsg}</p>}

        <div className="receipt-footer">
          <button onClick={downloadReceipt} disabled={loading}>
            {loading ? "Downloading..." : "Download Receipt"}
          </button>
        </div>
      </div>
    </div>
  );
}
