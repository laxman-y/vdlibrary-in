import React, { useEffect, useState } from "react";
import DashboardButton from "../components/DashboardButton";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

function FeeTracking() {
    const [students, setStudents] = useState([]);
    const [month, setMonth] = useState("");
    const [amounts, setAmounts] = useState({}); // Store input amounts per student

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/students`);
            setStudents(res.data);
        } catch (err) {
            console.error("Error fetching students:", err);
        }
    };

    const markFeeStatus = async (id, status) => {
        if (!month) return alert("Please select a month first.");

        const amount = amounts[id] || 0; // Default 0 if not entered

        console.log("✅ Sending to backend:", { id, month, status, amount });

        try {
            await axios.post(`${BASE_URL}/api/students/fees/${id}`, {
                month,
                status,
                amount
            });
            fetchStudents();
        } catch (err) {
            console.error("❌ Fee update failed", err);
        }
    };

    const getFeeInfo = (student) => {
        const feeRecord = student.fees?.find(f => f.month === month);
        return {
            status: feeRecord?.status || "unpaid",
            paidOn: feeRecord?.paidOn || null,
            amount: feeRecord?.amount || ""
        };
    };

    return (
        <div className="container">
            <h2>Monthly Fee Tracking</h2>
            <DashboardButton />

            <div className="table-wrapper">
                <div className="input-group">
                    <label>Select Month:</label>
                    <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} />
                </div>

            {students.length === 0 ? (
                <p>No students available.</p>
            ) : (
                <table className="student-table">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Shift</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Paid On <br />[MM-DD-YY]</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((s) => {
                            const fee = getFeeInfo(s);
                            return (
                                <tr key={s._id}>
                                    <td>{s.serialNo}</td>
                                    <td>{s.name}</td>
                                    <td>{s.shiftNo.join(", ")}</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={amounts[s._id] ?? fee.amount}
                                            onChange={(e) =>
                                                setAmounts({ ...amounts, [s._id]: e.target.value })
                                            }
                                            disabled={fee.status === "paid"}
                                        />
                                    </td>
                                    <td style={{ color: fee.status === "paid" ? "green" : "red" }}>
                                        {fee.status.toUpperCase()}
                                    </td>
                                    <td>
                                        {fee.paidOn ? new Date(fee.paidOn).toLocaleString() : "--"}
                                    </td>
                                    <td>
                                        <button onClick={() => markFeeStatus(s._id, "paid")}>Mark Paid</button>
                                        <br /> <br />
                                        <button onClick={() => markFeeStatus(s._id, "unpaid")}>Unpaid</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
            </div>
        </div>
    );
}

export default FeeTracking;
