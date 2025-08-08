import React, { createContext, useContext, useState, useEffect } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  // Load user from localStorage on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (username, password) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, {
        username,
        password
      });

      if (res.data.success) {
        const userData = { username: res.data.username };
        setCurrentUser(userData);
        localStorage.setItem("currentUser", JSON.stringify(userData));
        return true;
      }
    } catch (error) {
      console.error("Login error:", error);
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
