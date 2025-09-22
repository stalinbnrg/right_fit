import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "./pages/login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/profile";
import RegisteredUserLogin from "./pages/RegisteredUserLogin";
import MatchProfile from "./components/MatchProfile";

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
};

// Public route wrapper
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/home" /> : children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/signin" element={<PublicRoute><RegisteredUserLogin /></PublicRoute>} />

        {/* Protected routes */}
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/match/:id" element={<ProtectedRoute><MatchProfile /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
