import React, { useEffect, useState } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function AdminNotices() {
  const [notices, setNotices] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    const res = await axios.get(`${BASE_URL}/api/notices`);
    setNotices(res.data);
  };

  const addNotice = async () => {
    if (!text.trim()) return alert("Enter a notice text");
    await axios.post(`${BASE_URL}/api/notices`, { text, isNew: true });
    setText("");
    fetchNotices();
  };

  const deleteNotice = async (id) => {
    await axios.delete(`${BASE_URL}/api/notices/${id}`);
    fetchNotices();
  };

  return (
    <div className="container">
      <h2>📢 Manage Notices</h2>
      <input
        type="text"
        placeholder="Enter notice"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button onClick={addNotice}>➕ Add Notice</button>

      <table>
        <thead>
            <br />
          <tr>
            <th>Notice</th>
            &nbsp;
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {notices.map((n) => (
            <tr key={n._id}>
              <td>{n.text} {n.isNew && <span style={{ color: "red" }}>(NEW)</span>}</td>
              &nbsp;
              <td>
                <button onClick={() => deleteNotice(n._id)}>❌ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
