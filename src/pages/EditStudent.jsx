import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardButton from "../components/DashboardButton";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [shiftNoText, setShiftNoText] = useState("");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/students/${id}`)
      .then((res) => {
        setStudent(res.data);
        setShiftNoText(res.data.shiftNo.join(",")); // ✅ prefill shift input
      })
      .catch((err) => console.error("Error loading student", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Safely parse shiftNoText into an array
    const shifts = shiftNoText
      .split(",")
      .map((n) => parseInt(n.trim()))
      .filter((n) => !isNaN(n) && n >= 1 && n <= 3);

    try {
      await axios.put(`${BASE_URL}/api/students/${id}`, {
        ...student,
        shiftNo: shifts,
      });
      alert("Student updated!");
      navigate("/students");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (!student) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>Edit Student</h2>
      <>
                <DashboardButton />
            </>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Shift No</label>
          <input
            type="text"
            name="shiftNo"
            value={shiftNoText}
            onChange={(e) => setShiftNoText(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Serial No</label>
          <input
            type="number"
            name="serialNo"
            value={student.serialNo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Father Name</label>
          <input
            type="text"
            name="fatherName"
            value={student.fatherName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Mother Name</label>
          <input
            type="text"
            name="motherName"
            value={student.motherName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Address</label>
          <textarea
            name="address"
            value={student.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Mobile</label>
          <input
            type="tel"
            name="mobile"
            value={student.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Admission Date</label>
          <input
            type="date"
            name="admissionDate"
            value={student.admissionDate.slice(0, 10)}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditStudent;
