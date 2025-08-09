import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { exportToExcel } from "../utils/exportToExcel";
import "../style.css";
const BASE_URL = import.meta.env.VITE_BASE_URL;

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetchStudents();
    fetchNotices();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/students`);
      if (!res.ok) throw new Error("Failed to fetch students");
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error("Error loading students:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchNotices = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/notices`);
      const data = await res.json();
      setNotices(data);
    } catch (err) {
      console.error("Error loading notices:", err);
    }
  };

  const handleExport = () => {
    if (!students.length) {
      alert("No student data to export.");
      return;
    }

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const formatted = students.map((s) => {
      const paidMonths = (s.fees || [])
        .filter((f) => f.status === "paid")
        .map((f) => {
          const [year, month] = f.month.split("-");
          return `${monthNames[parseInt(month) - 1]} (${f.amount || 0})`;
        })
        .join(", ");

      const unpaidMonths = (s.fees || [])
        .filter((f) => f.status !== "paid")
        .map((f) => {
          const [year, month] = f.month.split("-");
          return monthNames[parseInt(month) - 1];
        })
        .join(", ");

      const attendanceDays = (s.attendance || []).length;

      return {
        "S.No": s.serialNo,
        Name: s.name,
        "Father's Name": s.fatherName,
        "Mother's Name": s.motherName,
        Address: s.address,
        Mobile: s.mobile,
        "Shift No": Array.isArray(s.shiftNo) ? s.shiftNo.join(", ") : s.shiftNo,
        "Admission Date": s.admissionDate
          ? new Date(s.admissionDate).toLocaleDateString("en-IN")
          : "",
        "Paid Months (with Amount)": paidMonths || "None",
        "Total Amount Paid": s.fees?.reduce(
          (acc, f) => f.status === "paid" ? acc + (f.amount || 0) : acc,
          0
        ) || 0,
        "Unpaid Months": unpaidMonths || "None",
        "Attendance Days": attendanceDays,
      };
    });

    exportToExcel(formatted, "Student_Fee_Attendance_List.xlsx");
  };

  return (
    <div className="container">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <img src="/logo11.png" alt="VDL Logo" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
        <h1 style={{ margin: 0 }}>VINAYAK DIGITAL LIBRARY KARHAN-MAU, UP (276402)</h1>
      </div>

      {/* Notice Section */}
{notices.length > 0 && (
  <marquee
    className="notice-bar"
    behavior="scroll"
    direction="left"
    scrollamount="5"
    onMouseOver={(e) => e.target.stop()}
    onMouseOut={(e) => e.target.start()}
  >
    {notices.map((n) => (
      <span key={n._id} style={{ marginRight: "50px" }}>
        📢 {n.text}{" "}
        {n.isNew && <span className="new-badge blink">NEW</span>}
      </span>
    ))}
  </marquee>
)}

      {/* About Section */}
      <div className="about-section">
        <div className="profile">
          <img src="/Vdlsir1.png" alt="Owner" className="circular-img" />
          <p>
            <strong>Director: Shashi Bhushan Singh</strong>
            <br />
            Founder of Vinayak Digital Library, committed to providing quality
            education resources to students.
          </p>
        </div>

        <div className="profile">
          <img src="/portfolio5.png" alt="Developer" className="circular-img" />
          <p>
            <strong>Developer: Laxman Yadav</strong>
            <br />
            Passionate full-stack developer behind this system, dedicated to
            tech solutions for education.
          </p>
        </div>
      </div>

      <div className="dashboard-grid">
        <Link to="/add-student" className="card">➕ Add Student</Link>
        <Link to="/students" className="card">📋 View Students</Link>
        <Link to="/attendance" className="card">✅ Mark Attendance</Link>
        <Link to="/monthly-summary" className="card">📆 Attendance Summary</Link>
        <Link to="/fee-tracking" className="card">💰 Fee Tracking</Link>
        <Link to="/checkin" className="card">🧍 Student Check-in</Link>
        <Link to="/updates" className="card">📋 Update History</Link>
        <Link to="/download-receipt" className="card">📄 Download Receipt</Link>
        <Link to="/admin/notices" className="card">📢 Manage Notices</Link>
        <Link to="/export-data" className="card">
  📥 Export Student + Fee + Attendance
</Link>

      </div>
    </div>
  );
}

export default Dashboard;
