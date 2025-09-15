// src/App.jsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";

// Pages
import Login from "./pages/login"; // ✅ corrected case
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/profile";

// Components
import CustomCursor from "./components/CustomCursor";

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // or sessionStorage
  return token ? children : <Navigate to="/" />;
};

// Redirect wrapper for login/register
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/home" /> : children;
};

function App() {
  return (
    <Router>
      <CustomCursor />
      <Routes>
        {/* Auth routes */}
        <Route path="/" element={<Login />} />         
        <Route path="/register" element={<Register />} />

        {/* Main app routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
