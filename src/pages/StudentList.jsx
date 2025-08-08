import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardButton from "../components/DashboardButton";
import "../style.css";
const BASE_URL = import.meta.env.VITE_BASE_URL;

function StudentList() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/students`);
                setStudents(res.data);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };

        fetchStudents();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            try {
                await axios.delete(`${BASE_URL}/api/students/${id}`);
                setStudents(students.filter((s) => s._id !== id));
            } catch (error) {
                console.error("Delete failed:", error);
            }
        }
    };
    return (
        <div className="container">
            <h2>Registered Students</h2>
            <>
                <DashboardButton />
            </>
            <div className="table-wrapper">
                <table className="student-table">
                    {/* table content */}
                    {students.length === 0 ? (
                        <p>No students registered yet.</p>
                    ) : (
                        <table className="student-table">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Shift</th>
                                    <th>Name</th>
                                    <th>Father</th>
                                    <th>Mother</th>
                                    <th>Address</th>
                                    <th>Mobile</th>
                                    <th>Admission Date <br />[MM-DD-YY]</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((s) => (
                                    <tr key={s._id}>
                                        <td>{s.serialNo}</td>
                                        <td>{Array.isArray(s.shiftNo) ? s.shiftNo.join(", ") : s.shiftNo}</td>
                                        <td>{s.name}</td>
                                        <td>{s.fatherName}</td>
                                        <td>{s.motherName}</td>
                                        <td>{s.address}</td> {/* ✅ ADDED */}
                                        <td>{s.mobile}</td>
                                        <td>{new Date(s.admissionDate).toLocaleDateString()}</td>
                                        <td>
                                            <button onClick={() => window.location.href = `/edit/${s._id}`}>Edit</button>
                                            <br /> <br />
                                            <button onClick={() => handleDelete(s._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </table>
            </div>


        </div>
    );
}

export default StudentList;
