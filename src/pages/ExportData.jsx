// src/pages/ExportData.jsx
import React, { useEffect, useState } from "react";
import { exportToExcel } from "../utils/exportToExcel";
const BASE_URL = import.meta.env.VITE_BASE_URL;

function ExportData() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
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
      <h2>📥 Export Student + Fee + Attendance Data</h2>
      <button onClick={handleExport} disabled={loading}>
        Export to Excel
      </button>
    </div>
  );
}

export default ExportData;
