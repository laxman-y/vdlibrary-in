import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardButton from "../components/DashboardButton";
const BASE_URL = import.meta.env.VITE_BASE_URL;

function AttendancePage() {
  const [students, setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [matchedStudent, setMatchedStudent] = useState(null);
  const [presentStatus, setPresentStatus] = useState("");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/students`)
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Error fetching students:", err));
  }, []);

  const handlePasswordSubmit = () => {
    const student = students.find(
      (s) => s.mobile && s.mobile.toString() === passwordInput.toString()
    );
    if (student) {
      setMatchedStudent(student);
    } else {
      alert("❌ Invalid password. Try again.");
    }
  };

  const handleSubmit = async () => {
    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }

    if (!matchedStudent || presentStatus === "") {
      alert("Please enter valid data.");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/students/attendance/${matchedStudent._id}`,
        {
          date: selectedDate,
          present: presentStatus === "present",
          password: passwordInput, // Mobile number as password
        }
      );

      alert("✅ Attendance submitted successfully!");
      setMatchedStudent(null);
      setPasswordInput("");
      setPresentStatus("");
    } catch (error) {
      console.error("❌ Error submitting attendance:", error);
      alert("Failed to submit attendance.");
    }
  };

  return (
    <div className="container">
      <h2>📅 Mark Your Own Attendance</h2>
      <DashboardButton />
 <div className="table-wrapper">
                <table className="student-table">
                    {/* table content */}
               
      <div className="input-group" style={{ marginBottom: "20px" }}>
        <label>🔐 Enter Your Password:</label>
        <input
          type="password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          placeholder="Enter your password"
        />
        <button onClick={handlePasswordSubmit}>🔍 Verify</button>
      </div>

      {matchedStudent && (
        <>
          <div className="input-group">
            <label>Select Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <table className="student-table" style={{ marginTop: "20px" }}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Student Name</th>
                <th>Shift</th>
                <th>Present</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{matchedStudent.serialNo}</td>
                <td>{matchedStudent.name}</td>
                <td>
                  {Array.isArray(matchedStudent.shiftNo)
                    ? matchedStudent.shiftNo.join(", ")
                    : matchedStudent.shiftNo}
                </td>
                <td>
                  <select
                    value={presentStatus}
                    onChange={(e) => setPresentStatus(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="present">✅ Present</option>
                    <option value="absent">❌ Absent</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>

          <button onClick={handleSubmit} style={{ marginTop: "20px" }}>
            Submit Attendance
          </button>
        </>
      )}

       </table>
            </div>
    </div>
  );
}

export default AttendancePage;
