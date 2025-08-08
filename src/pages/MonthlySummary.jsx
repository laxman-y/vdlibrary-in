import React, { useState } from "react";
import axios from "axios";
import DashboardButton from "../components/DashboardButton";
import "../style.css";
const BASE_URL = import.meta.env.VITE_BASE_URL;

function MonthlySummary() {
    const [month, setMonth] = useState("");
    const [password, setPassword] = useState("");
    const [summary, setSummary] = useState([]);
    const [error, setError] = useState("");

    const fetchSummary = async () => {
        if (!month) {
            alert("Please select a month.");
            return;
        }

        try {
           const res = await axios.get(
  `${BASE_URL}/api/students/attendance-summary?month=${month}&password=${password}`
);

            setSummary(res.data);
            setError("");
        } catch (err) {
            console.error("Failed to fetch summary", err);
            setError("Something went wrong while fetching summary.");
        }
    };
    

    const groupSessionsByDate = (attendanceDetails) => {
        const grouped = {};
        attendanceDetails.forEach((record) => {
            const date = record.date;
            const sessions = record.sessions || [];
            if (!grouped[date]) grouped[date] = [];
            if (sessions.length > 0) {
                sessions.forEach((s) => {
                    grouped[date].push({
                        entryTime: s.entryTime || "--",
                        exitTime: s.exitTime || "--",
                    });
                });
            } else {
                grouped[date].push({ entryTime: "--", exitTime: "--" });
            }
        });
        return grouped;
    };

    return (
        <div className="container">
            <h2>📊 Monthly Attendance Summary</h2>

            <div className="table-wrapper">
                <div className="input-group">
                    <label><strong>Enter Password:</strong></label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Your password"
                        required
                    />
                    <label><strong>Select Month:</strong></label>
                    <input
                        type="month" 
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                    />
                    <button onClick={fetchSummary}>Get Summary</button>
                </div>

                {error && <p style={{ color: "red" }}>{error}</p>}

                {summary.length > 0 ? (
                    <table className="student-table">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Name</th>
                                <th>Shift</th>
                                <th>Present</th>
                                <th>Absent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {summary.map((student) => {
                                const groupedSessions = groupSessionsByDate(student.attendanceDetails || []);
                                return (
                                    <React.Fragment key={student._id}>
                                        <DashboardButton />
                                        <tr>
                                            <td>{student.serialNo}</td>
                                            <td>{student.name}</td>
                                            <td>{Array.isArray(student.shiftNo) ? student.shiftNo.join(", ") : student.shiftNo}</td>
                                            <td>{student.presentCount}</td>
                                            <td>{student.absentCount}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="5">
                                                <table className="inner-table">
                                                    <thead>
                                                        <tr>
                                                            <th>Date</th>
                                                            <th>Entry Time</th>
                                                            <th>Exit Time</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {Object.entries(groupedSessions).map(([date, sessions], i) =>
                                                            sessions.map((session, j) => (
                                                                <tr key={`${i}-${j}`}>
                                                                    <td>{j === 0 ? date : ""}</td>
                                                                    <td>{session.entryTime}</td>
                                                                    <td>{session.exitTime}</td>
                                                                </tr>
                                                            ))
                                                        )}
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    month && <p>No attendance data found for {month}</p>
                )}
            </div>
        </div>
    );
}

export default MonthlySummary;
