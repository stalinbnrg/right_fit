// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Login from "./pages/login";       // ✅ corrected case
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/profile";   // ✅ corrected case

// Components
import CustomCursor from "./components/CustomCursor";

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
