import React, { useState } from "react";
import axios from "axios";
import DashboardButton from "../components/DashboardButton";
const BASE_URL = import.meta.env.VITE_BASE_URL;

function StudentCheckin() {
    const [mobile, setMobile] = useState("");
    const [student, setStudent] = useState(null);
    const [message, setMessage] = useState("");

    // 🗣️ Function to speak greeting
    const speakMessage = (studentName) => {
        const now = new Date();
        const hour = now.getHours();
        let greeting = "Good Morning";

        if (hour >= 12 && hour < 15) {
            greeting = "Good Afternoon";
        } else if (hour >= 15) {
            greeting = "Good Evening";
        }

        const message = `A message from Vinayak Digital Library ${greeting} ${studentName} ji , Your attendance is marked successfully, please take care of your time and do respect of mother, father, guru and cow. Thank you.`;

        const utterance = new SpeechSynthesisUtterance(message);
        utterance.lang = "en-IN";
        utterance.rate = 1; // Slow or fast voice
        window.speechSynthesis.cancel(); // Stop any previous
        window.speechSynthesis.speak(utterance);
    };

    // ❌ Stop voice when logging out
    const stopSpeaking = () => {
        window.speechSynthesis.cancel();
    };

    const handleLogin = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/students`);
            const found = res.data.find((s) => s.mobile === mobile);

            if (found) {
                setStudent(found);
                setMessage(`Welcome, ${found.name}!`);
            } else {
                setMessage("❌ Student not found.");
            }
        } catch (err) {
            console.error(err);
            setMessage("❌ Error fetching student.");
        }
    };

    const markEntry = async () => {
        const now = new Date();
        const entryTime = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        const today = now.toISOString().split("T")[0];

        try {
            await axios.post(`${BASE_URL}/api/students/attendance/${student._id}/entry`, {
                date: today,
                entryTime,
            });
            setMessage("✅ Entry marked successfully!");
            speakMessage(student.name); // ✅ Speak on entry
        } catch (err) {
            console.error(err);
            setMessage("❌ Failed to mark entry.");
        }
    };

    const markExit = async () => {
        const now = new Date();
        const exitTime = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        const today = now.toISOString().split("T")[0];

        try {
            await axios.post(`${BASE_URL}/api/students/attendance/${student._id}/exit`, {
                date: today,
                exitTime,
            });
            setMessage("✅ Exit marked successfully!");
            stopSpeaking(); // ✅ Stop voice on exit
        } catch (err) {
            console.error(err);
            setMessage("❌ Failed to mark exit.");
        }
    };

    return (
        <div className="container">
            <h2>🧍 Student Library Check-in</h2>
            <>
                <DashboardButton />
            </>
{!student ? (
  <>
    <label>📱 Enter your password:</label>
    <input
      type="password"
      value={mobile}
      onChange={(e) => setMobile(e.target.value)}
      placeholder="Your password"
      required
    />
    &nbsp;
    <button onClick={handleLogin}>Login</button>
    {message && <p style={{ color: "red", marginTop: "10px" }}>{message}</p>}
  </>
) : (
  <>
    <p><strong>{message}</strong></p>
    <button onClick={markEntry}>📥 Mark Entry</button>
    &nbsp;&nbsp;
    <button onClick={markExit}>📤 Mark Exit</button>
  </>
)}

            {/* {message && <p style={{ marginTop: "10px" }}>{message}</p>} */}
        </div>
    );
}

export default StudentCheckin;
