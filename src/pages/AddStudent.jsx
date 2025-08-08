import React, { useState } from "react";
import DashboardButton from "../components/DashboardButton";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import axios from "axios";

function AddStudent() {
  const [student, setStudent] = useState({
    shiftNo: "",
    serialNo: "",
    name: "",
    fatherName: "",
    motherName: "",
    address: "",
    mobile: "",
    admissionDate: ""
  });
  
  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/students`, student);
      alert("Student registered successfully!");
      console.log(res.data);
    } catch (err) {
      alert("Error submitting form");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Student Admission Form</h2>
        <>
            <DashboardButton />
        </>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
  <label>Shift No (e.g. 1 or 1,2 or 1,2,3)</label>
  <input
    type="text"
    name="shiftNo"
    onChange={(e) => {
      const value = e.target.value
        .split(",")
        .map((n) => parseInt(n.trim()))
        .filter((n) => !isNaN(n) && n >= 1 && n <= 3);
      setStudent({ ...student, shiftNo: value });
    }}
    required
  />
</div>
        <div className="input-group">
          <label>Serial No</label>
          <input type="number" name="serialNo" onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>Student Name</label>
          <input type="text" name="name" onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>Father's Name</label>
          <input type="text" name="fatherName" onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>Mother's Name</label>
          <input type="text" name="motherName" onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>Address</label>
          <textarea name="address" onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>Mobile No</label>
          <input type="tel" name="mobile" onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>Admission Date</label>
          <input type="date" name="admissionDate" onChange={handleChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddStudent;
