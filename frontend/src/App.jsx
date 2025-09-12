// src/App.jsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";

// Pages
import Login from "./pages/login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/profile";
import RegisteredUserLogin from "./pages/RegisteredUserLogin";

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
        {/* Public routes (redirect to /home if already logged in) */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <RegisteredUserLogin />
            </PublicRoute>
          }
        />

        {/* Protected routes (require token) */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
