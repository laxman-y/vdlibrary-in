// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // 👣 Newly added
import PrivateRoute from "./components/PrivateRoute";
import AddStudent from "./pages/AddStudent";
import StudentList from "./pages/StudentList";
import EditStudent from "./pages/EditStudent";
import AttendancePage from "./pages/AttendancePage";
import MonthlySummary from "./pages/MonthlySummary";
import FeeTracking from "./pages/FeeTracking";
import Dashboard from "./pages/Dashboard";
import StudentCheckin from "./pages/StudentCheckin";
import AdminLogin from "./pages/Login";
import AdminSettings from "./pages/AdminSettings";
import UpdateHistory from "./components/UpdateHistory";
import ForgotPassword from './pages/ForgotPassword';
import FeeReceipt from "./pages/FeeReceipt";
import AdminNotices from "./pages/AdminNotices";

import "./style.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main style={{ minHeight: "80vh" }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/checkin" element={<StudentCheckin />} />
              <Route path="/attendance" element={<AttendancePage />} />
              <Route path="/monthly-summary" element={<MonthlySummary />} />
             <Route path="/download-receipt" element={<FeeReceipt />} />
               <Route path="/forgot-password" element={<ForgotPassword />} />
              
              {/* 🔐 Protected Routes */}
              <Route path="/updates" element={<PrivateRoute><UpdateHistory /></PrivateRoute>} />
              <Route path="/add-student" element={<PrivateRoute><AddStudent /></PrivateRoute>} />
              <Route path="/students" element={<PrivateRoute><StudentList /></PrivateRoute>} />
              <Route path="/fee-tracking" element={<PrivateRoute><FeeTracking /></PrivateRoute>} />
              <Route path="/admin/notices" element={<PrivateRoute><AdminNotices /></PrivateRoute>} />
              <Route path="/edit/:id" element={<EditStudent />} />
              {/* 🔑 Admin Login */}
              <Route path="/login" element={<AdminLogin />} />
              <Route path="/admin-settings" element={<PrivateRoute><AdminSettings /></PrivateRoute>} />
            </Routes>
          </main>
          <Footer /> {/* 👣 Added professional footer */}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
