import React, { useEffect, useState } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import axios from "axios";

const UpdateHistory = () => {
    const [updates, setUpdates] = useState([]);

    useEffect(() => {
        axios
            .get(`${BASE_URL}/api/students/modifications`)
            .then((res) => setUpdates(res.data))
            .catch((err) => console.error("Error fetching updates:", err));
    }, []);

    return (
        <div className="container update-history-container">
            <h2>Student Update History</h2>

              <div className="table-wrapper">
                <div className="input-group"></div>
            <div style={{ overflowX: "auto" }}>
                <table
                    className="update-history-table"
                    border="1"
                    cellPadding="8"
                    cellSpacing="0"
                    style={{ width: "100%", borderCollapse: "collapse" }}
                >
                    <thead style={{ backgroundColor: "#007bff", color: "#fff" }}>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Father</th>
                            <th>Mother</th>
                            <th>Mobile</th>
                            <th>Field</th>
                            <th>Old Value</th>
                            <th>New Value</th>
                            <th>Change Type</th>
                            <th>Changed At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {updates.length === 0 ? (
                            <tr>
                                <td colSpan="10" style={{ textAlign: "center", padding: "10px" }}>
                                    No update history found.
                                </td>
                            </tr>
                        ) : (
                            updates.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name || "—"}</td>
                                    <td>{item.fatherName || "—"}</td>
                                    <td>{item.motherName || "—"}</td>
                                    <td>{item.mobile || "—"}</td>
                                    <td>{item.field || "—"}</td>
                                    <td>{item.oldValue !== undefined ? item.oldValue.toString() : "—"}</td>
                                    <td>{item.newValue !== undefined ? item.newValue.toString() : "—"}</td>
                                    <td>{item.changeType || "Update"}</td>
                                    <td>{item.modifiedAt ? new Date(item.modifiedAt).toLocaleString() : "—"}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            </div>
        
        </div>
    );
};

export default UpdateHistory;
